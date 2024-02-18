"use client";
import LoadingF from "@/components/loadingF";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { foodId } = useParams();
  const router = useRouter()

  const [foodData, setfoodData] = useState({});

  const [editedFoodData, seteditedFoodData] = useState({});
  const [loadingU, setloadingU] = useState(false);
  const [loadingF, setloadingF] = useState(true);
  const [error, seterror] = useState("");
  const [imagesUrl, setimagesUrl] = useState([]);
  const [images, setimages] = useState([]);
  const [updated, setupdated] = useState(false);

  const editFood = async (e) => {
    e.preventDefault();
    try {
      setloadingU(true);
      const res = await fetch(`/api/editFood/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFoodData),
      });
      const data = await res.json();
      if (data.error) {
        seterror(data.error);
        return setloadingU(false);
      }
      setloadingU(false);
      setupdated(true);
      setTimeout(() => {
        setupdated(false);
      }, 2000);
    } catch (error) {
      setloadingU(false);
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    seteditedFoodData({ ...editedFoodData, [e.target.name]: e.target.value });
  };

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

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`/api/fetchFood/${foodId}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!data.error) {
          setloadingF(false)
          setfoodData(data);
          setimagesUrl(data.images);
        }else{
          router.push("/")
        }
      } catch (error) {
        setloadingF(false)
        console.log(error.message);
      }
    };
    fetchFood();
  }, [foodId]);


  if(loadingF) return <LoadingF color={'#FFC144'} />
  return (
    <form onSubmit={editFood} className=" pt-16  max-w-3xl mx-auto px-2">
      <h1 className=" text-4xl font-bold text-center mb-10">Update food</h1>
      <div className=" flex flex-col sm:flex-row justify-center gap-10">
        <div className=" flex flex-col gap-3 flex-1">
          <input
            required
            onChange={handleChange}
            className=" p-2 rounded-lg outline-none border"
            type="text"
            name="title"
            placeholder="Food title"
            defaultValue={foodData.title}
          />
          <textarea
            required
            onChange={handleChange}
            className=" p-2 rounded-lg outline-none border"
            name="description"
            placeholder="Food description"
            defaultValue={foodData.description}
          />
          <input
            onChange={handleChange}
            type="text"
            name="category"
            required
            placeholder="New category"
            className="rounded-lg p-2 outline-none border"
            defaultValue={foodData.category}
          />

          <div className=" flex items-center gap-2">
            <input
              required
              onChange={handleChange}
              className=" p-2 rounded-lg outline-none border"
              type="number"
              name="price"
              placeholder="Price"
              min={0}
              defaultValue={foodData.price}
            />
            <span>DH</span>
          </div>
        </div>
        <div className=" flex-1">
          <p className=" mb-4">
            <span className=" font-bold mr-2">Images: </span>The first image
            will be the cover (max 6)
          </p>
          <input
            onChange={changeImages}
            accept="image/*"
            multiple
            maxLength={6}
            type="file"
            name="images"
            className=" w-full p-2 rounded-lg border  mb-3"
          />
          {imagesUrl.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className=" border  mb-2 rounded-lg p-2 flex items-center justify-between"
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
        {loadingU ? "Loading..." : "Update food"}
      </button>
      {error && <p className=" text-red-500 text-center pb-10 mt-3">{error}</p>}
      {updated && (
        <div onClick={() => {
          setupdated(false)
        }} className=" fixed inset-0 z-10 bg-[#00000099] flex items-center justify-center">
          <div className=" bg-white rounded-lg p-3 ">
            <p className=" text-green-500">Food updated Successfully!</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default Page;
