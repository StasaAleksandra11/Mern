function Label({ children, htmlFor, styleColor = true }) {
    return (
        <label htmlFor={htmlFor} style={{ color: styleColor ? '' : 'tomato' }}>
            {children}
        </label>
    );
}

export default Label;
