const connection = require('../Model/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const getdata = (req, res) => {
    try {
        let sql = "SELECT * FROM gautam";
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(200).json(results)
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

const userSignup = async (req, res) => {
    const { id, name, email, password, role } = req.body;
    const query = 'SELECT * FROM gautam WHERE email = ?';
    const query1 = 'INSERT INTO gautam SET ?';  //get se post krna 
    const salt = await bcrypt.genSalt(10);   // password generate hoga (bcrypt method)
    const pass = await bcrypt.hash(password, salt);
    const data = {
        id,
        name,
        email,
        password: pass,
        role  //password store ho rha hai
    }
    connection.query(query, email, (error, result) => {  // select query ke liye  1. parameter is error 2.  result
        if (result.length) {
            return res.send({ message: 'users email alredy exit' })
        }
        connection.query(query1, data, (err, result) => {
            if (err) {
                return res.send({ Error: err.sqlMessage })
            }
            return res.send({ status: 200, Response: result })
        })
    })
}

const loginUser = async (req, res) => {
    const sql = 'SELECT * FROM gautam WHERE email = ?'
    connection.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: 'Login error in server' });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: 'Password compare error' });
                if (response) {
                    const id = data[0].id;
                    const name = data[0].name;
                    const role =data[0].role;

                    const token = jwt.sign({ id,name,role }, 'nfwNNWNnwnnnneueweewe', { expiresIn: '1d' });
                    const options = {
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                        secure: false,
                        samesite: 'none',
                        path: '/'
                    };

                    return res.cookie('Gautam', token, options).json({ Status: 'Sucsess', token, data: data[0] })
                } else {
                    return res.json({ Error: 'Password not matched' })
                }
            })
        } else {
            return res.json({ Error: "no user id exit" })
        }
    })
}

const verifyUser = async (req,res)=>{
    try{
      const token = req.cookies.Gautam;
      console.log(token)
      var decoded = jwt.verify(token, 'nfwNNWNnwnnnneueweewe');
      res.status(200).json(decoded );
      console.log(decoded)
    }catch(err){
      console.log('error',err)
       res.json(err);
       
    }
  
  }
  

  const isLogout = async(req,res)=>{
    try {
      return res.status(200).clearCookie("Gautam").json({
        data: null,
        message: "Logout successful",
        status: true,
      });
    } catch (error) {
      res.json({error});
    }
  }

module.exports = { getdata, userSignup,loginUser,verifyUser,isLogout }