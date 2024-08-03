import ArticleCard from "./ArticleCard";

const MainCard = ({ news, isLoading }) => {
  return (
    <div className="articles">
      {/*  checks for api loading state and displays accordingly */}
      {isLoading ? (
        //  loading status
        <p>Loading...</p>
      ) : news?.length ? (
        news?.map((item) => (
          <ArticleCard
            key={item?.id}
            article={{
              title: item?.headline?.main || item?.webTitle,
              description: item?.abstract || item?.description,
              uri: item?.uri,
            }}
          />
        ))
      ) : (
        // if not items found
        <p>No Items Found</p>
      )}
    </div>
  );
};

export default MainCard;
