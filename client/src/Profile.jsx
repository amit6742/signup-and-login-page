import { useEffect, useState } from "react";
import { useAuth, upload } from "./firebase";

const Profile = () => {
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
  );
  const [photo, setPhoto] = useState(null);

  const handleProfile = (e) => {
    e.preventDefault()

    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleBtn = (e) => {
    e.preventDefault()

    upload(photo, currentUser, setLoading);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      console.log(currentUser);
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <>
      {/* profile sections */}
      <div>
        <a className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            onChange={handleProfile}
            className="w-[90px] h-[90px] mr-2 rounded-full"
            src={photoURL}
            alt="logo"
            disabled={loading || !photo}
          onClick={handleBtn}
       


          ></img>
        </a>
        <input type="file" style={{marginLeft:'100px', fontSize:'10px'}}  onChange={handleProfile}></input>

      </div>
    </>
  );
};

export default Profile;
