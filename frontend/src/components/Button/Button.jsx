

function Button({children, className, style, onClick}) {
  return (
    <button className={className} style={style} onClick={onClick}>{children}</button>
  )
}

export default Button