const axios = require('axios');
const cheerio = require('cheerio');

async function weather(location) {
	try {
		const _location = encodeURI(location);

		const res = await axios.get(`http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=C&culture=en-US&weasearchstr=${_location}`, {
			timeout: 2000,
		});

		const $ = cheerio.load(res.data, { xmlMode: true });
		const data = $('current');

		return {
			title: data.attr('observationpoint'),
			temperature: data.attr('temperature'),
			condition: data.attr('skytext'),
			date: data.attr('date'),
			observationTime: data.attr('observationtime'),
			feelsLike: data.attr('feelslike'),
			humidity: data.attr('humidity'),
			wind: data.attr('windspeed'),
		};
	} catch (error) {
		console.error('Error fetching weather data:', error.message);
		throw error;
	}
}

module.exports = { weather };
