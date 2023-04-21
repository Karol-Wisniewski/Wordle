import dotenv from 'dotenv';

dotenv.config();

const config = {
	apiServer: {
		port: process.env.API_SERVER_PORT || 5000,
	},
	mongodb: {
		url: process.env.MONGODB_URL || "mongodb+srv://karolwisniewski2001:EqYfboV0ZOpBIhMO@wordle.dbvmneg.mongodb.net/?retryWrites=true&w=majority",
	},
};

export default config;
