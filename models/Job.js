const Sequelize = require('sequelize');
const db = require('../database/connection');

const Job = db.define('Job',{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    title:{
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.STRING,
    }
})

module.exports = Job;