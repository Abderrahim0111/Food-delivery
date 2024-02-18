"use client";
import { logged } from "@/redux/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const IsAddFood = () => {
  const cities = [
    "Casablanca",
    "Marrakech",
    "Rabat",
    "Fez",
    "Tangier",
    "Agadir",
    "Meknes",
    "Oujda",
    "Kenitra",
    "Tetouan",
    "Safi",
    "Mohammedia",
    "El Jadida",
    "Beni Mellal",
    "Nador",
    "Settat",
    "Taza",
    "Khouribga",
    "Ouarzazate",
    "Larache",
    "Guelmim",
    "Khenifra",
    "Berrechid",
    "Beni Ansar",
    "Tetouan",
    "Temara",
    "Taourirt",
    "Essaouira",
    "Tiflet",
    "Sidi Slimane",
    "Mediouna",
    "Fquih Ben Salah",
    "Tiznit",
    "Youssoufia",
    "Oued Zem",
    "Sidi Kacem",
    "Tan-Tan",
    "Souq Larb’a al Gharb",
    "Oulad Teima",
    "Lqliaa",
    "Boujad",
    "Skhirat",
    "Jerada",
    "Martil",
    "Aknoul",
    "Khouribga",
    "Tinghir",
    "Tahala",
    "Zagora",
    "Ouezzane",
    "Berkane",
    "Sidi Bennour",
    "Drargua",
    "Taounate",
    "Sidi Yahia El Gharb",
    "Sidi Ifni",
    "Gourrama",
    "Benslimane",
    "Moulay Idriss Zerhoun",
    "Jorf",
    "Sefrou",
    "Ksar El Kebir",
    "Sidi Qacem",
    "El Aioun",
    "Midelt",
    "Azrou",
    "Boulemane",
    "Sidi Bennour",
    "El Hajeb",
    "Errachidia",
    "Imzoûrene",
    "Skoura",
    "Aoufous",
    "M'rirt",
    "Tata",
    "Asilah",
    "Tissa",
    "Assa",
    "Arfoud",
    "Taznakht",
    "Ait Melloul",
    "Guercif",
    "Sidi Rahal",
    "Sidi Allal Tazi",
    "Zaio",
    "Oulad Tayeb",
    "Taliouine",
    "Boumalne-Dadès",
    "Sidi Smail",
    "Ait Baha",
    "Ifrane",
    "Ouezzane",
    "Chefchaouen",
    "Tiznit",
    "Oulad Abbou",
    "Sebt Jahjouh",
    "Fam El Hisn",
    "Ksar El Kebir",
    "Bouznika",
    "Ait Iaaza",
    "Zag",
    "Sidi Bouknadel",
    "Lakhsas",
    "Ait Ourir",
    "M'diq",
    "Asilah",
    "Sebt Gzoula",
    "Zaouia Sidi Tahar Ben Boujida",
    "Bni Bouayach",
    "Oued Laou",
    "Megousse",
    "Larache",
    "Rissani",
    "Ouazzane",
    "Bhalil",
    "Tahannaout",
    "Boumalne-Dadès",
    "Bab Taza",
    "Dcheira El Jihadia",
    "Bhalil",
    "Tahannaout",
    "Boumalne-Dadès",
    "Bab Taza",
    "Dcheira El Jihadia",
    "Kariat Arekmane",
    "Oued Laou",
    "Skhirate",
    "Sidi Slimane",
    "Imilchil",
    "Bouznika",
    "Souq Larb’a al Gharb",
    "Chefchaouen",
    "Kariat Arkmane",
    "Fam El Hisn",
    "Zag",
    "Ksar El Kebir",
    "Ait Iaaza",
    "Tahala",
    "Taourirt",
    "Kelaat-M'Gouna",
    "Zaouiat Cheikh",
    "Oulad Teima",
    "Tinghir",
    "Lakhsas",
    "Gourrama",
    "Sebt Jahjouh",
    "Tiflet",
    "Taounate",
    "Skoura",
    "Khenifra",
    "Oued Zem",
    "Assa",
    "Guelmim",
    "Ksar El Kebir",
    "Tan-Tan",
    "Sidi Ifni",
    "Sidi Rahal",
    "Sidi Smail",
    "Berkane",
    "Sidi Slimane",
    "Sidi Yahya El Gharb",
    "Sidi Zouine",
    "Skhirat",
    "Souq Larb'a al Gharb",
    "Taourirt",
    "Tarfaya",
    "Tata",
    "Temara",
    "Tétouan",
    "Tiflet",
    "Tinghir",
    "Tiznit",
    "Témara",
    "Taza",
    "Tétouan",
    "Zag",
  ];
  const [foodData, setfoodData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    freeDelivery: false,
    images: [],
  });
  const [imagesUrl, setimagesUrl] = useState([]);
  const [images, setimages] = useState([]);
  const [error, seterror] = useState("");
  const [storeError, setstoreError] = useState("");
  const [storeData, setstoreData] = useState({});
  const [loading, setloading] = useState(false);
  const [storeLoading, setstoreLoading] = useState(false);
  const [storeImage, setstoreImage] = useState();
  const [created, setcreated] = useState(false);

  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const changeImages = (e) => {
    const selectedImages = Array.from(e.target.files).map((file) => {
      return URL.createObjectURL(file);
    });
    setimagesUrl([...imagesUrl, ...selectedImages]);
    const selectedImagesFiles = Array.from(e.target.files);
    setimages([...images, ...selectedImagesFiles]);
  };
  const deleteImage = (index) => {
    const filtredImages = imagesUrl.filter((image, i) => {
      return index !== i;
    });
    setimagesUrl(filtredImages);
    const filtredImagesFiles = images.filter((image, i) => {
      return index !== i;
    });
    setimages(filtredImagesFiles);
  };
  const handleChange = (e) => {
    if (e.target.name === "freeDelivery") {
      setfoodData({ ...foodData, freeDelivery: e.target.checked });
    } else {
      setfoodData({ ...foodData, [e.target.name]: e.target.value });
    }
  };

  const changeStoreInfo = (e) => {
    setstoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const setStoreInfo = async (e) => {
    e.preventDefault();
    setstoreLoading(true);
    const formData = new FormData();
    formData.append("storeImage", storeImage);
    try {
      const res1 = await fetch("/api/uploadStoreImage", {
        method: "POST",
        body: formData,
      });
      const data1 = await res1.json();
      if (data1.error) {
        setstoreLoading(false);
        return setstoreError(data1.error);
      }
      const updatedStoreInfo = { ...storeData, storeImage: data1 };
      const res = await fetch("/api/setStoreInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStoreInfo),
      });
      const data = await res.json();
      if (data.error) {
        setstoreLoading(false);
        return setstoreError(data.error);
      }
      setstoreLoading(false);
      setstoreError("");
      dispatch(logged(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (images.length > 6) {
        setloading(false);
        return seterror("The maximum is 6 images");
      }
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const res = await fetch("/api/uploadImages", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return seterror(data.error);
      }
      seterror("");
      const updatedFoodData = { ...foodData, images: data };
      const res2 = await fetch("/api/createFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFoodData),
      });
      const data2 = await res2.json();

      if (data2.error) {
        setloading(false);
        return seterror(data2.error);
      }
      setloading(false);
      setfoodData({
        title: "",
        description: "",
        category: "",
        price: 0,
        freeDelivery: false,
        images: [],
      });
      setimagesUrl([])
      seterror("");
      setcreated(true)
      setTimeout(() => {
        setcreated(false)
      }, 2000);
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };

  if (user.modified === false) {
    return (
      <div className="pt-16  max-w-xl mx-auto">
        <h1 className=" text-4xl font-bold text-center mb-10">
          Last step to start posting foods
        </h1>
        <form onSubmit={setStoreInfo} className=" flex flex-col gap-3">
          <input
            required
            onChange={changeStoreInfo}
            type="text"
            name="storeName"
            placeholder="Store name"
            className=" p-2 rounded-lg outline-none"
          />
          <select
            required
            onChange={changeStoreInfo}
            name="storeCity"
            className=" p-2 rounded-lg outline-none"
          >
            <option value="" hidden>
              Store city
            </option>
            {cities.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
          <h4 className=" text-lg font-bold">Store logo:</h4>
          <input
            required
            onChange={(e) => {
              setstoreImage(e.target.files[0]);
            }}
            type="file"
            multiple={false}
            accept="image/*"
            name="storeImage"
            className=" p-2 rounded-lg outline-none border"
          />
          <button className="uppercase p-2 rounded-lg text-center w-full mt-5 mb-10 bg-[#00A081] text-white">
            {storeLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        {storeError && (
          <p className=" text-red-500 text-center pb-10">{storeError}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className=" pt-16  max-w-3xl mx-auto ">
      <h1 className=" text-4xl font-bold text-center mb-10">Create food</h1>
      <div className=" flex flex-col sm:flex-row justify-center gap-10">
        <div className=" flex flex-col gap-3 flex-1">
          <input
            required
            onChange={handleChange}
            value={foodData.title}
            className=" p-2 rounded-lg outline-none"
            type="text"
            name="title"
            placeholder="Food title"
          />
          <textarea
            required
            onChange={handleChange}
            value={foodData.description}
            className=" p-2 rounded-lg outline-none"
            name="description"
            placeholder="Food description"
          />
          <input
            onChange={handleChange}
            value={foodData.category}
            type="text"
            name="category"
            required
            placeholder="Category"
            className="rounded-lg p-2 outline-none"
          />

          <div className=" flex items-center gap-2">
            <input
              required
              onChange={handleChange}
              value={foodData.price}
              className=" p-2 rounded-lg outline-none"
              type="number"
              name="price"
              placeholder="Price"
              min={0}
            />
            <span>DH</span>
          </div>
          <div className=" flex items-center gap-3">
            <p>Delivery:</p>
            <div className=" flex items-center gap-2">
              <label htmlFor="freeDelivery">Free</label>
              <input
                onChange={handleChange}
                checked={foodData.freeDelivery}
                type="checkbox"
                name="freeDelivery"
                id="freeDelivery"
              />
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <p className=" mb-4">
            <span className=" font-bold mr-2">Images: </span>The first image
            will be the cover (max 6)
          </p>
          <input
            onChange={changeImages}
            required
            accept="image/*"
            multiple
            maxLength={6}
            type="file"
            name="images"
            className=" w-full p-2 rounded-lg border border-[#00A081] mb-3"
          />
          {imagesUrl.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className=" border border-[#00A081] mb-2 rounded-lg p-2 flex items-center justify-between"
              >
                <div className="h-14 w-14 ">
                  <Image src={imageUrl} alt="image" height={200} width={200} />
                </div>
                <button
                type="button"
                  onClick={() => {
                    deleteImage(index);
                  }}
                  className=" text-red-500 uppercase text-lg"
                >
                  Delele
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className={` uppercase p-2 rounded-lg text-center w-full ${
          !error && "mb-10"
        } mt-10 bg-[#00A081] text-white`}
      >
        {loading ? "Loading..." : "Create food"}
      </button>
      {error && <p className=" text-red-500 text-center pb-10 mt-3">{error}</p>}
      { created && <div className="fixed text-green-500 top-28 bg-white rounded-lg p-3 right-4">
        Food created successfully!
      </div>}
    </form>
  );
};

export default IsAddFood;
