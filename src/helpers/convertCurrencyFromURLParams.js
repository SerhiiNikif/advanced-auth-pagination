import axios from 'axios';

const getExchangeRate = async toCurrency => {
    const response = await axios.get(process.env.PBANK_API_URL);
    const filteredArray = response.data.filter(obj => obj.ccy.toLowerCase() === toCurrency.toLowerCase())[0].buy;

    return filteredArray;
}

export default async function (result, currency) {
    const exchangeRate = await getExchangeRate(currency);
    for (const e of result) {
        e.price = Number((e.price / +exchangeRate).toFixed(2));
    }

    return result
}
