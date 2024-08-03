import React from "react";

const Header = ({
  setSearchQuery,
  setSelectedDate,
  setEndDate,
  setSource,
  setCategory,
}) => {
  return (
    <header>
      <div className="logo">NewsAggregatorUI</div>

      <div>
        <label htmlFor="date">Filter Date</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setEndDate(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="category" style={{ marginRight: "5px" }}>
          Category
        </label>

        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Technology">Technology</option>
          <option value="Football">Football</option>
          <option value="Science">Science</option>
        </select>
      </div>
      <div>
        <label htmlFor="source" style={{ marginRight: "5px" }}>
          Source
        </label>

        <select
          name="source"
          id="source"
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="nyTimes">New York Times</option>
          <option value="guardian">Guardian</option>
        </select>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
