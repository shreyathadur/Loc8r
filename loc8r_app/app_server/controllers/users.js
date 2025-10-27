const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

// Register new user
module.exports.register = async function(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.render('register', { title: 'Register', error: 'All fields required.' });
    }
    if (password !== confirmPassword) {
        return res.render('register', { title: 'Register', error: 'Passwords do not match.' });
    }
    try {
    const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { title: 'Register', error: 'Username already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return res.redirect('/signin');
    } catch (err) {
        return res.render('register', { title: 'Register', error: 'Registration failed.' });
    }
};

// Login user
module.exports.login = async function(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('signin', { title: 'Login', error: 'All fields required.' });
    }
    try {
    const user = await User.findOne({ username });
        if (!user) {
            return res.render('signin', { title: 'Login', error: 'Invalid username or password.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('signin', { title: 'Login', error: 'Invalid username or password.' });
        }
    // Store username, email, and admin status in session and redirect to home
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.isAdmin = !!user.isAdmin;
    return res.redirect('/?login=success');
    } catch (err) {
        return res.render('signin', { title: 'Login', error: 'Login failed.' });
    }
};
