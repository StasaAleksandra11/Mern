

function Button({children, className, style}) {
  return (
    <button className={className} style={style}>{children}</button>
  )
}

export default Button