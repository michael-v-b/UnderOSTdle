const MotifList = ({ motifs }) => {
  return (
    <>
      <div className="motif-list">
        {motifs.map((motif) => (
          <div className="motif" key={motif}>
            {motif},
          </div>
        ))}
      </div>
    </>
  );
};

export default MotifList;
