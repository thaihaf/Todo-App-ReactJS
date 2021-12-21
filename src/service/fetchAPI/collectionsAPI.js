import axios from "axios";

export default function taskAPI() {
  const getCollections = async (linkAPI) => {
    const res = await axios.get(linkAPI);
    return res.data;
  };

  const getCollection = async (collectionID) => {
    const res = await axios.get(`api/categories/${collectionID}`);
    return res.data;
  };

  return { getCollection, getCollections };
}
