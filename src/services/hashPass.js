import bcrypt from 'bcryptjs';

async function hashPassword(password) {
    const hased = await bcrypt.hash(password, 8);
    return hased
}

async function verify(password, hashKey) {
    const verified = await bcrypt.compare(password, hashKey);
    return verified
}

export { verify, hashPassword }