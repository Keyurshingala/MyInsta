import jwt from 'jsonwebtoken';


const createJwt = async (uniqId) => {
    const sign = await jwt.sign({ _id: uniqId }, process.env.JWT_SECRECT_KEY);
    return sign
}

const verifyJwt = async (jwtToken) => {
    const verified = await jwt.verify(jwtToken, process.env.JWT_SECRECT_KEY);
    return verified;
}

export { createJwt, verifyJwt }