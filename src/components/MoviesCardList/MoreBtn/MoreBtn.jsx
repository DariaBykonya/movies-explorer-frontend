import "./MoreBtn.css";

function MoreBtn({ onClick }) {
  return (
    <button className="more-btn" onClick={onClick}>
      Ещё
    </button>
  );
}

export default MoreBtn;
