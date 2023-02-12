const connection = require('../db');
const jwt = require('jsonwebtoken');

const createToken = (id, username)=>{
    return jwt.sign({id, username}, process.env.JWT_SECRET , {
        expiresIn: "2 days"
    });
}

const addUser = async (username, credit) => {
    const [result] = await connection.query(`
        INSERT INTO users (username, credit)
        VALUES ( ?, ?)
    `, [username, credit])
   return findUserById(result.insertId);
}

const findUserById = async (id) => {
    const [result] = await connection.query(`
        SELECT id, username, credit 
        FROM users 
        WHERE id = (?)
    `, [id])
   return result;
}

module.exports = {addUser, findUserById, createToken}