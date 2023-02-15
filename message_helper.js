import axios from 'axios'
export default function post_message(data) {
	data = JSON.stringify(data)
	return axios({
		method: 'post',
		url: `https://graph.facebook.com/v15.0/109406995407357/messages`,
		headers: {
			Authorization: `Bearer ${process.env.ACCESS_TOKEN_PERMA}`,
			'Content-Type': 'application/json',
		},
		data,
	})
}
