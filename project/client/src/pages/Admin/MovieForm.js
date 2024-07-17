import React, { useEffect } from "react";
import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../calls/movies";
import moment from "moment";

const MovieForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedMovie,
  setSelectedMovie,
  formType,
  getData,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMovie) {
      setSelectedMovie({ ...selectedMovie, rating: selectedMovie.rating || 0 });
    }
  }, [selectedMovie]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      values.rating = parseFloat(values.rating);
      if (isNaN(values.rating) || values.rating < 0.1 || values.rating > 10.0) {
        message.error("Rating must be between 0.1 and 10.0");
        dispatch(hideLoading());
        return;
      }

      let response = null;
      if (formType === "add") {
        response = await addMovie(values);
        setSelectedMovie(null);
      } else {
        response = await updateMovie({ ...values, movieId: selectedMovie._id });
        setSelectedMovie(null);
      }
      
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedMovie}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              name="title"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input placeholder="Enter the movie name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea rows={4} placeholder="Enter the description" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Duration (in min)"
              name="duration"
              rules={[{ required: true, message: "Movie duration is required!" }]}
            >
              <Input type="number" placeholder="Enter the duration" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: "Movie language is required!" }]}
            >
              <Select placeholder="Select Language">
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="Hindi">Hindi</Select.Option>
                <Select.Option value="Kannada">Kannada</Select.Option>
                <Select.Option value="Telugu">Telugu</Select.Option>
                <Select.Option value="Bengali">Bengali</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[{ required: true, message: "Release date is required!" }]}
            >
              <Input type="date" placeholder="Select the release date" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: "Movie genre is required!" }]}
            >
              <Select placeholder="Select Genre">
                <Select.Option value="Action">Action</Select.Option>
                <Select.Option value="Comedy">Comedy</Select.Option>
                <Select.Option value="Drama">Drama</Select.Option>
                <Select.Option value="Horror">Horror</Select.Option>
                <Select.Option value="Love">Love</Select.Option>
                <Select.Option value="Patriot">Patriot</Select.Option>
                <Select.Option value="Animation">Animation</Select.Option>
                <Select.Option value="Thriller">Thriller</Select.Option>
                <Select.Option value="Mystery">Mystery</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Rating is required and must be between 0.1 and 10.0",
                },
                () => ({
                  validator(_, value) {
                    const rating = parseFloat(value);
                    if (!isNaN(rating) && rating >= 0.1 && rating <= 10.0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Rating must be between 0.1 and 10.0")
                    );
                  },
                }),
              ]}
            >
              <Input type="number" step="0.1" placeholder="Enter the rating (0.1 - 10.0)" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Poster URL"
              name="poster"
              rules={[{ required: true, message: "Poster URL is required!" }]}
            >
              <Input placeholder="Enter the poster URL" />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 8 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {formType === "add" ? "Add Movie" : "Update Movie"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MovieForm;
