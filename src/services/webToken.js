import jwt from 'jsonwebtoken';


const createJwt = async (uniqId) => {
    const sign = await jwt.sign({ _id: uniqId }, process.env.JWT_SECRECT_KEY, {
        // expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        expiresIn: 120 // it will be expired after 120ms
        //expiresIn: "120s" // it will be expired after 120s
    });
    return sign
}

const verifyJwt = async (jwtToken) => {
    const verified = await jwt.verify(jwtToken, process.env.JWT_SECRECT_KEY);
    return verified;
}

export { createJwt, verifyJwt }