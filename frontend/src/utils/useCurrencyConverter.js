import { useSelector } from 'react-redux';

function useCurrencyConverter() {
    const { currency } = useSelector((state) => state.currencyStore);

    const convertPrice = (priceInEuros) => {
        switch (currency) {
            case 'USD':
                return `$${(priceInEuros * 1.08).toFixed(2)}`;
            case 'DIN':
                return `${(priceInEuros * 117).toFixed(2)} din`;
            case 'EUR':
                return `${priceInEuros}€`;
        }
    };
    return convertPrice;
}

export default useCurrencyConverter;
