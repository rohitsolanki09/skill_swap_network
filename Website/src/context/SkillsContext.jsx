import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SkillsContext = createContext();

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};

export const SkillsProvider = ({ children }) => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);

  // Load skills from localStorage
  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem('skillSwapSkills') || '[]');
    setSkills(savedSkills);
  }, []);

  // Load requests from localStorage
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('skillSwapRequests') || '[]');
    setRequests(savedRequests);
  }, []);

  const addSkill = (skillData) => {
    if (!user) return { success: false, error: 'Must be logged in to add skills' };

    const newSkill = {
      id: Date.now().toString(),
      ...skillData,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString()
    };

    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    localStorage.setItem('skillSwapSkills', JSON.stringify(updatedSkills));

    return { success: true, skill: newSkill };
  };

  const getUserSkills = (userId = null) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return [];
    return skills.filter(skill => skill.userId === targetUserId);
  };

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  const searchSkills = (query, category = '', level = '') => {
    return skills.filter(skill => {
      const matchesQuery = skill.name.toLowerCase().includes(query.toLowerCase()) ||
                          skill.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || skill.category === category;
      const matchesLevel = !level || skill.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  };

  const requestSkillSwap = (skillId, message) => {
    if (!user) return { success: false, error: 'Must be logged in to request swaps' };

    const skill = skills.find(s => s.id === skillId);
    if (!skill) return { success: false, error: 'Skill not found' };

    if (skill.userId === user.id) {
      return { success: false, error: 'Cannot request your own skill' };
    }

    const newRequest = {
      id: Date.now().toString(),
      skillId,
      skillName: skill.name,
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId: skill.userId,
      toUserName: skill.userName,
      message,
      status: 'pending', // pending, accepted, declined, completed
      createdAt: new Date().toISOString()
    };

    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('skillSwapRequests', JSON.stringify(updatedRequests));

    return { success: true, request: newRequest };
  };

  const updateRequestStatus = (requestId, status) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status, updatedAt: new Date().toISOString() } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('skillSwapRequests', JSON.stringify(updatedRequests));
  };

  const getIncomingRequests = () => {
    if (!user) return [];
    return requests.filter(req => req.toUserId === user.id && req.status === 'pending');
  };

  const getOutgoingRequests = () => {
    if (!user) return [];
    return requests.filter(req => req.fromUserId === user.id);
  };

  const value = {
    skills,
    requests,
    addSkill,
    getUserSkills,
    getSkillsByCategory,
    searchSkills,
    requestSkillSwap,
    updateRequestStatus,
    getIncomingRequests,
    getOutgoingRequests
  };

  return (
    <SkillsContext.Provider value={value}>
      {children}
    </SkillsContext.Provider>
  );
};
