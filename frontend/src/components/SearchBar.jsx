function SearchBar({ search, setSearch }) {
    return (
        <div
            style={{
                marginBottom: "30px"
            }}
        >
            <input
                type="text"
                placeholder="🔍 Search your URLs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px"
                }}
            />
        </div>
    );
}

export default SearchBar;