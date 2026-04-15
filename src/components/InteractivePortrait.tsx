import profileImg from "@/assets/profile-photo.png";

const InteractivePortrait = () => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
      <img
        src={profileImg}
        alt="R. Garg"
        width={512}
        height={512}
        className="w-full h-full object-cover object-top rounded-full"
      />
    </div>
  );
};

export default InteractivePortrait;
