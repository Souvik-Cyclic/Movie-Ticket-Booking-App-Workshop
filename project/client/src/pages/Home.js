import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../calls/movies";
import { message, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  useEffect(() => {
    getData();
    document.title = "Home Page";
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
          <Input
            placeholder="Search for movies & shows"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            style={{ borderRadius: '8px', padding: '10px' }}
          />
        </Col>
      </Row>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <div
                key={movie._id}
                style={{
                  width: '200px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={() => {
                  navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                  );
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={movie.poster}
                  alt="Movie Poster"
                  style={{
                    width: '100%',
                    borderRadius: '8px 8px 0 0',
                  }}
                />
                <h3 style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                  {movie.title}
                </h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;