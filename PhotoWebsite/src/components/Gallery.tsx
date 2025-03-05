import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Gallery.css";
import { photosOriginal, photosChronological, photosOriginalThumbnails, photosChronologicalThumbnails } from "./FishPhotos";
import { getPhotoMetadata } from "./MetadataReader";

const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<"layout1" | "layout2">("layout1");
  const [matchedPhotos, setMatchedPhotos] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [photoDate, setPhotoDate] = useState<string | null>(null);

  const photos = layout === "layout1" ? photosOriginal : photosChronological;
  const photosThumbnails = layout === "layout1" ? photosOriginalThumbnails : photosChronologicalThumbnails;

  useEffect(() => {
    if (selectedIndex !== null) {
      loadPhotoDate(photos[selectedIndex]); // Load the date for the newly selected photo
    } else if (matchedPhotos.length > 0 && currentPosition !== null) {
      loadPhotoDate(matchedPhotos[currentPosition]); // Load the date for the currently displayed matched photo
    }
  }, [selectedIndex, matchedPhotos, currentPosition, photos]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowRight") {
          setSelectedIndex((prev) =>
            prev !== null && prev < photos.length - 1 ? prev + 1 : prev
          );
        } else if (event.key === "ArrowLeft") {
          setSelectedIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : prev
          );
        }
      } else if (matchedPhotos.length > 0) {
        if (event.key === "ArrowRight") {
          setCurrentPosition((prev) =>
            prev < matchedPhotos.length - 1 ? prev + 1 : prev
          );
        } else if (event.key === "ArrowLeft") {
          setCurrentPosition((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, photos.length, matchedPhotos.length]);

  const CustomMarker = ({
    position,
    markerId,
    onClick,
  }: {
    position: [number, number];
    markerId: string;
    onClick: (markerId: string) => void;
  }) => {
    const icon = new L.DivIcon({
      className: "custom-marker",
      html: "X",
      iconSize: [30, 30],
    });

    return (
      <Marker
        position={position}
        icon={icon}
        eventHandlers={{ click: () => onClick(markerId) }}
      />
    );
  };

  const loadPhotoDate = async (photo: string) => {
    const date = await getPhotoMetadata(photo);
    setPhotoDate(date);
  };

  const handleMarkerClick = (markerId: string) => {
    let matchedPhotos: string[] = [];

    switch (markerId) {
      case "1": //Parking Garage
        matchedPhotos = [
          "/Images/FishImages/SNY00652.jpg",
          "/Images/FishImages/SNY00656.jpg",
          "/Images/FishImages/SNY00663.jpg",
          "/Images/FishImages/SNY00667.jpg",
          "/Images/FishImages/SNY00679.jpg",
          "/Images/FishImages/SNY00687.jpg",
          "/Images/FishImages/SNY00693.jpg",
          "/Images/FishImages/SNY00696.jpg",
          "/Images/FishImages/SNY00702.jpg",
          "/Images/FishImages/SNY00714.jpg",
          "/Images/FishImages/SNY00717.jpg",
          "/Images/FishImages/SNY01546.jpg",
          "/Images/FishImages/SNY01555.jpg",
        ];
        break;

      case "2": //Center Ave Enterance to Aggie Village
        matchedPhotos = [
          "/Images/FishImages/SNY00725.jpg",
          "/Images/FishImages/SNY00732.jpg",
          "/Images/FishImages/SNY00744.jpg",
          "/Images/FishImages/SNY00747.jpg",
          "/Images/FishImages/SNY00750.jpg",
        ];
        break;

      case "3": //Aggie Village
        matchedPhotos = [
          "/Images/FishImages/SNY00765.jpg",
          "/Images/FishImages/SNY00768.jpg",
          "/Images/FishImages/SNY01555.jpg",
          "/Images/FishImages/SNY01559.jpg",
          "/Images/FishImages/SNY01570.jpg",
          "/Images/FishImages/SNY01578.jpg",
        ];
        break;
      case "4": //Lake St Exit from Aggie Village
        matchedPhotos = [
          "/Images/FishImages/SNY00768.jpg",
          "/Images/FishImages/SNY00772.jpg",
        ];
        break;
      case "5": //Gifford Building
        matchedPhotos = ["/Images/FishImages/SNY00774.jpg"];
        break;
      case "6": //Path Behind Art Building
        matchedPhotos = ["/Images/FishImages/SNY00779.jpg"];
        break;
      case "7": //Yates
        matchedPhotos = ["/Images/FishImages/SNY00790.jpg"];
        break;
      case "8": //Center Ave Statue
        matchedPhotos = [
          "/Images/FishImages/SNY00794.jpg",
          "/Images/FishImages/SNY00797.jpg",
        ];
        break;
      case "9": //School of Education
        matchedPhotos = [
          "/Images/FishImages/SNY00802.jpg",
          "/Images/FishImages/SNY00808.jpg",
        ];
        break;
      case "10": //Near Eddy and the Library
        matchedPhotos = ["/Images/FishImages/SNY00821.jpg"];
        break;
      case "11": //Clark
        matchedPhotos = [
          "/Images/FishImages/SNY00833.jpg",
          "/Images/FishImages/SNY00841.jpg",
          "/Images/FishImages/SNY00851.jpg",
        ];
        break;
      case "12": //Library Cube
        matchedPhotos = ["/Images/FishImages/SNY00855.jpg"];
        break;
      case "13": //Engineering 1
        matchedPhotos = ["/Images/FishImages/SNY00885.jpg"];
        break;
      case "14": //Engineering 2
        matchedPhotos = ["/Images/FishImages/SNY00888.jpg"];
        break;
      case "15": //Comp Sci
        matchedPhotos = ["/Images/FishImages/SNY00891.jpg"];
        break;
      case "16": //Prospect Plaza Parking Lot
        matchedPhotos = [
          "/Images/FishImages/SNY00900.jpg",
          "/Images/FishImages/SNY00907.jpg",
          "/Images/FishImages/SNY01484.jpg",
          "/Images/FishImages/SNY01492.jpg",
        ];
        break;
      case "17": //My Apartment
        matchedPhotos = [
          "/Images/FishImages/SNY00912.jpg",
          "/Images/FishImages/SNY00918.jpg",
          "/Images/FishImages/SNY00923.jpg",
          "/Images/FishImages/SNY00928.jpg",
          "/Images/FishImages/SNY00939.jpg",
          "/Images/FishImages/SNY00952.jpg",
          "/Images/FishImages/SNY00999.jpg",
          "/Images/FishImages/SNY01005.jpg",
          "/Images/FishImages/SNY01261.jpg",
          "/Images/FishImages/SNY01269.jpg",
          "/Images/FishImages/SNY01461.jpg",
          "/Images/FishImages/SNY01508.jpg",
          "/Images/FishImages/SNY01538.jpg",
          "/Images/FishImages/LRM_20231122_162713.jpg",
        ];
        break;
      case "18": //Laundromat
        matchedPhotos = [
          "/Images/FishImages/SNY00955.jpg",
          "/Images/FishImages/SNY00959.jpg",
          "/Images/FishImages/SNY00961.jpg",
          "/Images/FishImages/SNY00972.jpg",
          "/Images/FishImages/SNY00977.jpg",
        ];
        break;
      case "19": //Prospect Garbage
        matchedPhotos = [
          "/Images/FishImages/SNY00988.jpg",
          "/Images/FishImages/SNY00991.jpg",
        ];
        break;
      case "20": //Prospect and Whitcomb
        matchedPhotos = [
          "/Images/FishImages/SNY01020.jpg",
          "/Images/FishImages/SNY01030.jpg",
          "/Images/FishImages/SNY01038.jpg",
        ];
        break;
      case "21": //Gifford
        matchedPhotos = ["/Images/FishImages/SNY01031.jpg"];
        break;
      case "22": //Aggie Village Parking Lot
        matchedPhotos = ["/Images/FishImages/SNY01034.jpg"];
        break;
      case "23": //Prospect
        matchedPhotos = ["/Images/FishImages/SNY01041.jpg"];
        break;
      case "24": //Prospect and Center
        matchedPhotos = ["/Images/FishImages/SNY01045.jpg"];
        break;
      case "25": //Hilton
        matchedPhotos = [
          "/Images/FishImages/SNY01051.jpg",
          "/Images/FishImages/SNY01062.jpg",
        ];
        break;
      case "26": //Loaf N Jug
        matchedPhotos = ["/Images/FishImages/SNY01070.jpg"];
        break;
      case "27": //Prospect Station
        matchedPhotos = ["/Images/FishImages/SNY01080.jpg"];
        break;
      case "28": //Railroad
        matchedPhotos = [
          "/Images/FishImages/SNY01086.jpg",
          "/Images/FishImages/SNY01090.jpg",
        ];
        break;
      case "29": //Parking Lot Fence
        matchedPhotos = ["/Images/FishImages/SNY01097.jpg"];
        break;
      case "30": //Rocky Mountain Research Station
        matchedPhotos = ["/Images/FishImages/SNY01100.jpg"];
        break;
      case "31": //Prospect Plaza Fence
        matchedPhotos = ["/Images/FishImages/SNY01109.jpg"];
        break;
      case "32": //Old Town Statues
        matchedPhotos = [
          "/Images/FishImages/SNY01120.jpg",
          "/Images/FishImages/SNY01122.jpg",
        ];
        break;
      case "33": //Little Bird Break
        matchedPhotos = ["/Images/FishImages/SNY01127.jpg"];
        break;
      case "34": //Old Town Bench
        matchedPhotos = ["/Images/FishImages/SNY01133.jpg"];
        break;
      case "35": //Old Town Tree
        matchedPhotos = ["/Images/FishImages/SNY01137.jpg"];
        break;
      case "36": //City Park Bench
        matchedPhotos = ["/Images/FishImages/SNY01150.jpg"];
        break;
      case "37": //Statue of Liberty
        matchedPhotos = ["/Images/FishImages/SNY01161.jpg"];
        break;
      case "38": //City Park Playground
        matchedPhotos = [
          "/Images/FishImages/SNY01169.jpg",
          "/Images/FishImages/SNY01173.jpg",
        ];
        break;
      case "39": //City Park Table
        matchedPhotos = ["/Images/FishImages/SNY01179.jpg"];
        break;
      case "40": //City Park Rock
        matchedPhotos = [
          "/Images/FishImages/SNY01181.jpg",
          "/Images/FishImages/SNY01192.jpg",
        ];
        break;
      case "41": //City Park Pool
        matchedPhotos = ["/Images/FishImages/SNY01197.jpg"];
        break;
      case "42": //City Park Lake Rock
        matchedPhotos = ["/Images/FishImages/SNY01210.jpg"];
        break;
      case "43": //City Park Lake Corner
        matchedPhotos = ["/Images/FishImages/SNY01216.jpg"];
        break;
      case "44": //Underpass
        matchedPhotos = [
          "/Images/FishImages/SNY01219.jpg",
          "/Images/FishImages/SNY01222.jpg",
          "/Images/FishImages/SNY01226.jpg",
          "/Images/FishImages/SNY01238.jpg",
        ];
        break;
      case "45": //Hut Roof
        matchedPhotos = ["/Images/FishImages/SNY01242.jpg"];
        break;
      case "46": //City Park Bridge
        matchedPhotos = ["/Images/FishImages/SNY01253.jpg"];
        break;
      case "47": //Big Horn Landing Plaza
        matchedPhotos = ["/Images/FishImages/SNY01274.jpg"];
        break;
      case "48": //Big Horn Landing Bridge
        matchedPhotos = ["/Images/FishImages/SNY01278.jpg"];
        break;
      case "49": //Big Horn Landing Corner
        matchedPhotos = [
          "/Images/FishImages/SNY01284.jpg",
          "/Images/FishImages/SNY01290.jpg",
          "/Images/FishImages/SNY01296.jpg",
          "/Images/FishImages/SNY01307.jpg",
        ];
        break;
      case "50": //Stadium Apartments Bike Rack
        matchedPhotos = ["/Images/FishImages/SNY01321.jpg"];
        break;
      case "51": //Arboretum
        matchedPhotos = [
          "/Images/FishImages/SNY01332.jpg",
          "/Images/FishImages/SNY01338.jpg",
        ];
        break;
      case "52": //Academic Village Rock Pit
        matchedPhotos = [
          "/Images/FishImages/SNY01341.jpg",
          "/Images/FishImages/SNY01345.jpg",
          "/Images/FishImages/SNY01349.jpg",
        ];
        break;
      case "53": //IM Field Soccer Net
        matchedPhotos = ["/Images/FishImages/SNY01354.jpg"];
        break;
      case "54": //Front Rec Center
        matchedPhotos = [
          "/Images/FishImages/SNY01362.jpg",
          "/Images/FishImages/SNY01378.jpg",
        ];
        break;
      case "55": //Rec Center Rock Wall
        matchedPhotos = [
          "/Images/FishImages/SNY01391.jpg",
          "/Images/FishImages/SNY01393.jpg",
        ];
        break;
      case "56": //Bush Rec Center
        matchedPhotos = ["/Images/FishImages/SNY01404.jpg"];
        break;
      case "57": //Cone
        matchedPhotos = [
          "/Images/FishImages/SNY01413.jpg",
          "/Images/FishImages/SNY01420.jpg",
        ];
        break;
      case "58": //Call Box
        matchedPhotos = ["/Images/FishImages/SNY01421.jpg"];
        break;
      case "59": //Underground Parking
        matchedPhotos = ["/Images/FishImages/SNY01450.jpg"];
        break;
      case "60": //Hole in Wall
        matchedPhotos = ["/Images/FishImages/SNY01454.jpg"];
        break;
      case "61": //Lake and Center
        matchedPhotos = [
          "/Images/FishImages/SNY01501.jpg",
          "/Images/FishImages/SNY01507.jpg",
        ];
        break;
      case "62": //Lake St
        matchedPhotos = ["/Images/FishImages/SNY01589.jpg"];
        break;
      case "63": //Center Ave Mall Enterance
        matchedPhotos = ["/Images/FishImages/SNY01609.jpg"];
        break;

      default:
        console.warn("No photos found for this marker:", markerId);
    }

    setMatchedPhotos(matchedPhotos);
    setCurrentPosition(0); // Start from the first photo of the case
    loadPhotoDate(matchedPhotos[0]);
  };

  const closeModal = () => {
    setMatchedPhotos([]);
    setSelectedIndex(null); // Close modal when clicked outside
  };

  return (
    <div className="container py-4">
      <h1
        className="text-center mb-4"
        style={{
          color: "white",
        }}
      >
        PHOTOGRAPHY GALLERY NOVEMBER 2023
      </h1>

      <div className="text-center mb-3">
        <button
          className={`btn ${
            layout === "layout1" ? "selected-btn" : "text-white"
          }`}
          onClick={() => setLayout("layout1")}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          Original Display Layout
        </button>
        <span className="mx-3 text-white">|</span>
        <button
          className={`btn ${
            layout === "layout2" ? "selected-btn" : "text-white"
          }`}
          onClick={() => setLayout("layout2")}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          Chronological Layout
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {photosThumbnails.map((src, index) => (
          <div key={index} className="p-1" style={{ width: "10%" }}>
            <img
              src={src}
              alt={`Photo ${index + 1}`}
              className="img-fluid shadow"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedIndex(index);
                loadPhotoDate(src); // Load the date for the selected photo
              }}
            />
          </div>
        ))}
      </div>

      {/* MODAL FOR FULL-SCREEN IMAGE */}
      {(matchedPhotos.length > 0 || selectedIndex !== null) && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
          onClick={closeModal}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body p-0" style={{ position: "relative" }}>
                <img
                  src={
                    matchedPhotos.length > 0
                      ? matchedPhotos[currentPosition]
                      : photos[selectedIndex || 0]
                  }
                  alt="Selected"
                  className="img-fluid w-100"
                  style={{ transform: "scale(2.25)" }}
                />
                <div
                  className="text-center text-white"
                  style={{
                    position: "absolute",
                    top: "-75%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {photoDate && `${photoDate} `}
                  {matchedPhotos.length > 0
                    ? `${currentPosition + 1}/${matchedPhotos.length}`
                    : selectedIndex !== null
                    ? `${selectedIndex + 1}/${photos.length}`
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-4">
        <div className="map-container">
          <MapContainer
            center={[40.57814441590173, -105.08795094576963]}
            zoom={13}
            style={{ height: "800px", width: "100%" }}
            className="custom-map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="grayscale-tile"
            />

            <CustomMarker //Parking Garage
              position={[40.56804422949841, -105.08322173204029]}
              markerId="1"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Center Ave Enterance to Aggie Village
              position={[40.56823132449553, -105.084003477051]}
              markerId="2"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Aggie Village
              position={[40.5682514395478, -105.08515800497932]}
              markerId="3"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Lake St Exit from Aggie Village
              position={[40.56865776230876, -105.0858676689353]}
              markerId="4"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Gifford Building
              position={[40.569183334699005, -105.08569925240863]}
              markerId="5"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Path Behind Art Building
              position={[40.56967581684474, -105.08527313338283]}
              markerId="6"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Yates
              position={[40.57021396860055, -105.0837072113145]}
              markerId="7"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Center Ave Statue
              position={[40.571079695416664, -105.0836475208044]}
              markerId="8"
              onClick={handleMarkerClick}
            />
            <CustomMarker //School of Education
              position={[40.57129741875321, -105.08380237385815]}
              markerId="9"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Near Eddy and the Library
              position={[40.5724568246556, -105.08379084760045]}
              markerId="10"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Clark
              position={[40.572720065673096, -105.08324171142505]}
              markerId="11"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Library Cube
              position={[40.57323093402608, -105.08407634457897]}
              markerId="12"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Engineering 1
              position={[40.57546958113972, -105.08372851038192]}
              markerId="13"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Engineering 2
              position={[40.57548681460632, -105.08250492202527]}
              markerId="14"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Comp Sci
              position={[40.5741244261188, -105.08330961304434]}
              markerId="15"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect Plaza Parking Lot
              position={[40.568036155435045, -105.08264348670932]}
              markerId="16"
              onClick={handleMarkerClick}
            />
            <CustomMarker //My Apartment
              position={[40.56813231753728, -105.08233801933032]}
              markerId="17"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Laundromat
              position={[40.5674110984024, -105.08222794099555]}
              markerId="18"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect Garbage
              position={[40.568404079253135, -105.0825801916668]}
              markerId="19"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect and Whitcomb
              position={[40.56719591920452, -105.0869204431513]}
              markerId="20"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Gifford
              position={[40.56899270280789, -105.08664175840595]}
              markerId="21"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Aggie Village Parking Lot
              position={[40.56805899831978, -105.08651555351483]}
              markerId="22"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect
              position={[40.567088019983714, -105.08579683085928]}
              markerId="23"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect and Center
              position={[40.56703891622212, -105.08373844245847]}
              markerId="24"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Hitlon
              position={[40.566990512811394, -105.08186442385015]}
              markerId="25"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Loaf N Jug
              position={[40.56690995471088, -105.07742107089204]}
              markerId="26"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect Station
              position={[40.567895537858426, -105.07876507291829]}
              markerId="27"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Railroad
              position={[40.56700122288538, -105.07903801894301]}
              markerId="28"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Parking Lot Fence
              position={[40.5673003704986, -105.08020182059384]}
              markerId="29"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Rocky Mountain Research Station
              position={[40.56731948748049, -105.08115665172298]}
              markerId="30"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Prospect Plaza Fence
              position={[40.56725300739433, -105.08152615920984]}
              markerId="31"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Old Town Statues
              position={[40.58753265745119, -105.0760391387356]}
              markerId="32"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Little Bird Break
              position={[40.58761312172797, -105.07511728427765]}
              markerId="33"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Old Town Bench
              position={[40.58798882891657, -105.07475064882875]}
              markerId="34"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Old Town Tree
              position={[40.58760158844368, -105.07585827008481]}
              markerId="35"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Bench
              position={[40.58415137838148, -105.1030880867194]}
              markerId="36"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Statue of Liberty
              position={[40.5843338719423, -105.10337501416633]}
              markerId="37"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Playground
              position={[40.58458862846317, -105.10423783551491]}
              markerId="38"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Table
              position={[40.585097154526835, -105.10505304467704]}
              markerId="39"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Rock
              position={[40.58412694319558, -105.104368859097]}
              markerId="40"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Pool
              position={[40.58387068735184, -105.10456198939421]}
              markerId="41"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Lake Rock
              position={[40.58354392378194, -105.10424817467643]}
              markerId="42"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Lake Corner
              position={[40.58336044105558, -105.1041961754244]}
              markerId="43"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Underpass
              position={[40.583719093707636, -105.10551530201396]}
              markerId="44"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Hut Roof
              position={[40.583130233701844, -105.10602620968054]}
              markerId="45"
              onClick={handleMarkerClick}
            />
            <CustomMarker //City Park Bridge
              position={[40.58261003271772, -105.10646710964544]}
              markerId="46"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Big Horn Landing Plaza
              position={[40.56595058723768, -105.09311783510158]}
              markerId="47"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Big Horn Landing Bridge
              position={[40.56592835553612, -105.09354137053589]}
              markerId="48"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Big Horn Landing Corner
              position={[40.56629630996091, -105.09341474165127]}
              markerId="49"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Stadium Apartments Bike Rack
              position={[40.568536951257634, -105.09252710617842]}
              markerId="50"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Arboretum
              position={[40.56979144389916, -105.09220345404118]}
              markerId="51"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Academic Village Rock Pit
              position={[40.57170370115578, -105.09087932153932]}
              markerId="52"
              onClick={handleMarkerClick}
            />
            <CustomMarker //IM Field Soccer Net
              position={[40.57285062523252, -105.09109449922221]}
              markerId="53"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Front Rec Center
              position={[40.57462570451224, -105.08971173507068]}
              markerId="54"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Rec Center Rock Wall
              position={[40.57484221998137, -105.08877993036428]}
              markerId="55"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Bush Rec Center
              position={[40.57508404751097, -105.0885819435428]}
              markerId="56"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Cone
              position={[40.57262596437094, -105.08936584911945]}
              markerId="57"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Call Box
              position={[40.57286837614676, -105.09032249377846]}
              markerId="58"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Underground Parking
              position={[40.56803217823271, -105.09112704966692]}
              markerId="59"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Hole in Wall
              position={[40.56714898243397, -105.09212263122438]}
              markerId="60"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Lake and Center
              position={[40.56883859637439, -105.08264107700161]}
              markerId="61"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Lake St
              position={[40.568774179108544, -105.08491940691344]}
              markerId="62"
              onClick={handleMarkerClick}
            />
            <CustomMarker //Center Ave Mall Enterance
              position={[40.568874383728904, -105.08373030339396]}
              markerId="63"
              onClick={handleMarkerClick}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
