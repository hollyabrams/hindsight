import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class HindsightApi {
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${HindsightApi.token}` };
    const params = (method === 'get') ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // =========== User API routes ============

  // Admin: Add a new user
  static async addUser(data) {
    let res = await this.request('users', data, 'post');
    return res;
  }

  // Admin: Get list of all users
  static async getAllUsers() {
    let res = await this.request('users');
    return res.users;
  }

  // Get a specific user (user or admin)
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Update a user's details (user or admin)
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  // Add a project for a user
  static async addProject(username, projectData) {
    let res = await this.request(`users/${username}/project`, projectData, 'post');
    return res.project;
  }

  // Get list of projects for a user
  static async getProjects(username) {
    let res = await this.request(`users/${username}/projects`);
    return res.projects;
  }

  // Delete a user (user or admin)
  static async deleteUser(username) {
    await this.request(`users/${username}`, {}, 'delete');
  }

  // =========== Auth API routes ============
  
  // Log in a user and return a token
  static async login(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res.token;
  }

  // Register a new user and return a token
  static async register(data) {
    let res = await this.request(`auth/register`, data, 'post');
    return res.token;
  }

  // =========== Project API routes ============

  // Admin: Create a new project
  static async createProject(data) {
    let res = await this.request('projects', data, 'post');
    return res.project;
  }

  // Get list of all projects
  static async getAllProjects(queryParams = {}) {
    let res = await this.request('projects', queryParams);
    return res.projects;
  }

  // Get a specific project by ID
  static async getProject(id) {
    let res = await this.request(`projects/${id}`);
    return res.project;
  }

  // Admin: Update a specific project by ID
  static async updateProject(id, data) {
    let res = await this.request(`projects/${id}`, data, 'patch');
    return res.project;
  }

  // Admin: Delete a specific project by ID
  static async deleteProject(id) {
    await this.request(`projects/${id}`, {}, 'delete');
  }

  // =========== Retrospective API routes ============

  // Get list of retrospectives for a specific user
  static async getRetrospectives(username) {
    let res = await this.request(`users/${username}/retrospectives`);
    return res.retrospectives;
  }
  
  // Admin: Create a new retrospective
  static async createRetrospective(data) {
    let res = await this.request('retrospectives', data, 'post');
    return res.retrospective;
  }

  // Get list of all retrospectives
  static async getAllRetrospectives(queryParams = {}) {
    let res = await this.request('retrospectives', queryParams);
    return res.retrospectives;
  }

  // Get a specific retrospective by ID
  static async getRetrospective(id) {
    let res = await this.request(`retrospectives/${id}`);
    return res.retrospective;
  }

  // Admin: Update a specific retrospective by ID
  static async updateRetrospective(id, data) {
    let res = await this.request(`retrospectives/${id}`, data, 'patch');
    return res.retrospective;
  }

  // Admin: Delete a specific retrospective by ID
  static async deleteRetrospective(id) {
    await this.request(`retrospectives/${id}`, {}, 'delete');
  }
}

// For now, put token ("testuser" or "testadmin" / "password" on class)
HindsightApi.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default HindsightApi;
