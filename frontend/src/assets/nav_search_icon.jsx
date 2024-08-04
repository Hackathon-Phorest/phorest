const SearchIcon = ({ color = "black" }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.0065 19.0065H19.9532L19.5798 18.6465C20.8865 17.1265 21.6732 15.1532 21.6732 13.0065C21.6732 8.21984 17.7932 4.33984 13.0065 4.33984C8.21984 4.33984 4.33984 8.21984 4.33984 13.0065C4.33984 17.7932 8.21984 21.6732 13.0065 21.6732C15.1532 21.6732 17.1265 20.8865 18.6465 19.5798L19.0065 19.9532V21.0065L25.6732 27.6598L27.6598 25.6732L21.0065 19.0065ZM13.0065 19.0065C9.68651 19.0065 7.00651 16.3265 7.00651 13.0065C7.00651 9.68651 9.68651 7.00651 13.0065 7.00651C16.3265 7.00651 19.0065 9.68651 19.0065 13.0065C19.0065 16.3265 16.3265 19.0065 13.0065 19.0065Z"
      fill={color}
    />
  </svg>
);

export default SearchIcon;
