import styles from "/styles/Button.module.css";


const Button = ({text, onClick, className}) => {
  return (
    <div onClick={onClick} className={`${styles.button} ${className}`}>{text}</div>
  )
}

export default Button