import React, { useState, useEffect } from "react";
import axios from "axios";
import DateComp from "../components/DateComp";
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import KeyIcon from "@mui/icons-material/Key";
import PoolIcon from "@mui/icons-material/Pool";
import SailingIcon from "@mui/icons-material/Sailing";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { comment } from "postcss";
import { Box } from "@mui/system";
import {
  FormLabel,
  IconButton,
  ListItemDecorator,
  Menu,
  Textarea,
} from "@mui/joy";
import {
  FormatBold,
  FormatItalic,
  KeyboardArrowDown,
} from "@mui/icons-material";

function BookProp() {
  const [imgs, setimgs] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [listing, setlisting] = useState({ review: [] });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [price, setprice] = useState(0);
  const [rating, setrating] = useState("");
  const random = Math.ceil(Math.random() * 5);

  const handleBooking = async () => {
    try {
      const diffTime = Math.abs(startDate - endDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const res = await axios.post(
        `http://localhost:5005/bookings/new/${id}`,
        {
          dateRange: { start: startDate, end: endDate },
          totalPrice: diffDays * listing.price,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        navigate("/myBooking");
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    const r = e.target.value;
    setrating(r);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let l = listing;
      let ob = {
        text: rating,
      };
      l.reviews.push(ob);
      setlisting({ ...l });
      setrating("");
      // const response = await axios.put(`http://localhost:5005/listings/{listingid}/review/{bookingid}`)
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    console.log("booknjsdksvdjsnvdjsnvkjdnskj");
    const fn = async () => {
      console.log(id);
      try {
        let res = await axios.get(`http://localhost:5005/listings/${id}`);
        console.log(res);
        if (res.status == 200) {
          setlisting({ ...res.data.listing });
          setprice(res.data.listing.price);
          let ls = [];
          ls.push(res.data.listing.thumbnail);
          if (res.data.listing.metadata.imgs) {
            ls = [...ls, ...res.data.listing.metadata?.imgs];
          }
          setimgs([...ls]);
        }
      } catch (e) {
        console.error(e);
        alert(e?.response?.data?.error);
      }
    };
    fn();
  }, []);

  useEffect(() => {
    const diffTime = Math.abs(startDate - endDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setprice(listing.price * diffDays);
  }, [startDate, endDate]);

  const properties = [
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 30, color: "#888" }} />,
      title: "Jenny??????????????????",
      desc: "????????????????????????????????????????????????????????????????????????????????????????????????",
    },
    {
      icon: <KeyIcon sx={{ fontSize: 30, color: "#888" }} />,
      title: "?????????????????????",
      desc: "?????????100%?????????????????????????????????5????????????",
    },
    {
      icon: <PoolIcon sx={{ fontSize: 30, color: "#888" }} />,
      title: "????????????",
      desc: "?????????????????????????????????????????????????????????",
    },
  ];

  const amenities = [
    {
      icon: <SailingIcon className="text-blue-600" sx={{ fontSize: 18 }} />,
      title: "??????",
    },
    {
      icon: (
        <BeachAccessIcon className="text-yellow-600" sx={{ fontSize: 18 }} />
      ),
      title: "????????????",
    },
    {
      icon: (
        <RestaurantIcon className=" text-purple-600" sx={{ fontSize: 18 }} />
      ),
      title: "?????????????????????",
    },
    {
      icon: <WifiIcon className="text-green-600" sx={{ fontSize: 18 }} />,
      title: "????????????",
    },
    {
      icon: <LocalParkingIcon className="text-red-600" sx={{ fontSize: 18 }} />,
      title: "???????????????",
    },
  ];

  const comments = [
    {
      avatar:
        "https://a0.muscache.com/im/pictures/user/58ecdfcf-d2de-4f13-a5f1-305fb37db255.jpg?im_w=240",
      name: "Lydia",
      date: "2022???11???",
      comment:
        "??????????????????????????????????????????????????????????????????????????????????????????--??????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????? Constantia ??? ???????????????????????????????????????????????????????????????????????? World of Birds ??? ?????????????????? ???????????????????????????????????????8???????????????11?????????????????? Jen???????????????????????????????????????????????? Thandi??????",
    },
    {
      avatar:
        "https://a0.muscache.com/im/pictures/user/44cf30ad-2a3f-4668-b32a-b196f3f465f6.jpg?im_w=240",
      name: "Zimkitha",
      date: "2022???11???",
      comment:
        "????????????????????????????????? ???????????????????????? Jen?????????????????????????????????????????? ????????????????????????????????????????????? ????????????????????? ??????/????????????????????????????????????????????????????????????????????????????????????????????????????????? ????????????????????????????????????Jen???????????????????????????",
    },
  ];
  return (
    <div className="mt-14 md:max-w-5xl mx-auto">
      <head className="flex flex-row justify-between pt-4">
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-sans tracking-widest">{listing.title}</p>
          <div className="flex items-center gap-2">
            <Rating
              name="simple-controlled"
              value={3}
              size="small"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />{" "}
            <span className=" underline font-bold">
              {listing?.reviews?.length}?????????
            </span>
            <section>
              <span className=" text-xs mr-1">????</span>
              <span className="text-sm">????????????</span>
            </section>
            <span className="text-sm underline font-bold">
              {listing?.address?.line1}
            </span>
          </div>
        </div>
        <div className="self-end flex gap-2 items-center">
          <Button variant="text" startIcon={<IosShareIcon />}>
            ??????
          </Button>
          <Button variant="text" startIcon={<FavoriteBorderIcon />}>
            ??????
          </Button>
        </div>
      </head>

      <section className="grid mt-8 grid-cols-4 grid-rows-2 gap-2">
        {imgs.map((item, i) => (
          <Item key={i} item={item} index={i} />
        ))}
      </section>

      <section className="w-full gap-10 mt-11">
        <div className="float-left w-2/3">
          <section className="flex justify-between border-b-2 pb-6">
            <div>
              <p className="text-2xl font-semibold">???Jenny?????????????????????</p>
              <div className="flex gap-2 text-zinc-700">
                <span>?????? {2 * listing?.metadata?.beds} ???</span>??
                <span>{listing?.metadata?.bedrooms} ?????????</span>??
                <span>{listing?.metadata?.bathrooms} ????????????</span>
              </div>
            </div>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </section>
          <ul className="mt-4 border-b-2 pb-3">
            {properties.map((element) => {
              return (
                <li className="flex items-center gap-6 py-3">
                  {element.icon}
                  <div>
                    <p className="text-lg font-semibold">{element.title}</p>
                    <p className="text-sm text-zinc-600">{element.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="py-6 text-base indent-6 border-b-2">
            ???????????????5??????????????????????????????????????????????????? ??????????????????*
            *???12???????????????* 5???????????? 3????????????
            ????????????????????????????????????5?????????????????????????????????????????????????????????????????????????????????????????????????????????
            ?????????????????????????????????????????????????????? ?????????????????????
          </p>
          <ul className="mt-3 flex gap-4">
            {amenities.map((element) => (
              <li className="flex gap-6 items-center py-2">
                <Chip
                  variant="outlined"
                  icon={element.icon}
                  label={element.title}
                />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <section>
              <span className="text-3xl">??????</span>
            </section>
            <ul className="mb-6">
              {comments.map((element) => (
                <li className="pt-6">
                  <div className="flex gap-6">
                    <Avatar
                      alt="Remy Sharp"
                      src={element.avatar}
                      sx={{ width: 42, height: 42 }}
                    ></Avatar>
                    <div>
                      <p>{element.name}</p>
                      <p className="text-sm text-zinc-500">{element.date}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-zinc-600">{element.comment}</p>
                </li>
              ))}
            </ul>
            <FormControl
              style={{
                width: "100%",
              }}
            >
              <Textarea
                id="title-input"
                name="rating"
                placeholder="?????????????????????..."
                minRows={5}
                endDecorator={
                  <Box
                    sx={{
                      display: "flex",
                      gap: "var(--Textarea-paddingBlock)",
                      pt: "var(--Textarea-paddingBlock)",
                      borderTop: "1px solid",
                      borderColor: "divider",
                      flex: "auto",
                    }}
                  >
                    <IconButton
                      variant="plain"
                      color="neutral"
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                      <FormatBold />
                      <KeyboardArrowDown fontSize="md" />
                    </IconButton>
                    <Menu
                      onClose={() => setAnchorEl(null)}
                      size="sm"
                      placement="bottom-start"
                      sx={{ "--List-decorator-size": "24px" }}
                    >
                      {["200", "normal", "bold"].map((weight) => (
                        <MenuItem>
                          <ListItemDecorator></ListItemDecorator>
                        </MenuItem>
                      ))}
                    </Menu>
                    <IconButton variant="soft" color="primary">
                      <FormatItalic />
                    </IconButton>
                    <Button type="submit" sx={{ ml: "auto" }}>
                      ??????
                    </Button>
                  </Box>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="float-right w-1/3 px-6 flex justify-center relative">
          <div class="flex font-sans shadow-xl rounded-2xl border-2 sticky top-0 bg-white transition-all">
            <div class="flex-auto p-6">
              <div class="flex flex-wrap">
                <h1 class="flex-auto text-2xl font-semibold text-slate-900">
                  ???{price} <span className="text-lg font-normal">???</span>
                </h1>
                <div class="text-sm font-thin text-slate-700 flex items-center underline">
                  {listing?.reviews?.length} ?????????
                </div>
                <div class="w-full text-sm font-medium text-slate-700 mt-2 flex justify-center">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <InputLabel id="demo-select-small">??????</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      label="??????"
                    >
                      <MenuItem value={10}>2</MenuItem>
                      <MenuItem value={20}>4</MenuItem>
                      <MenuItem value={30}>5</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div class="flex items-baseline mb-6 border-b border-slate-200">
                <div class="">
                  <DateComp
                    style={{ zIndex: "100" }}
                    startDate={startDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                  />
                </div>
              </div>
              <div class="flex space-x-4 mb-6 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button
                    disabled={!listing.published}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBooking();
                      navigate("/myBooking");
                    }}
                    className={`${
                      listing.published
                        ? "bg-blue-600 text-white"
                        : "text-zinc-600 bg-zinc-200"
                    } h-10 px-6 w-full font-semibold rounded-md tracking-widest`}
                  >
                    ????????????
                  </button>
                </div>
              </div>
              <p class="text-sm text-slate-700 text-center">????????????????????????</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    // <>
    //     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgb(222,222,222)', height: '200%' }}>
    //         {/* picture */}
    //         <Carousel >
    //     {
    //         imgs.map( (item, i) => <Item key={i} item={item} /> )
    //     }
    // </Carousel>

    //         <div >
    //             {/* Title */}
    //             <h1 style={{ marginLeft: "50px" }}>{listing.title}</h1>
    //             <div style={{display:'flex',marginLeft: "50px"}}>
    //             {
    //                 Array(random).fill().map((_, i) => (<div style={{marginRight:'2px'}}>???</div>))
    //             }

    //         </div>
    //             <h2 style={{ marginLeft: "50px" }}>{listing.postedOn}</h2>
    //             {/* Price */}
    //             <h2 style={{ marginLeft: "50px" }}>{"$ " + price}</h2>
    //         </div>

    //         <div style={{ marginLeft: "50px", border: '2px solid gray', width: '500px', padding: '10px' }}>
    //             <p>{listing?.address?.line1}</p>
    //             <p>{listing?.address?.line2}</p>
    //             <p>{listing?.address?.line3}</p>
    //         </div>

    //         {/* Bedroom */}
    //         <h4 style={{ marginLeft: "50px" }}>?????????: {listing?.metadata?.bedrooms}</h4>
    //         <h4 style={{ marginLeft: "50px" }}>?????????: {listing?.metadata?.bedrooms}</h4>
    //         <h4 style={{ marginLeft: "50px" }}>????????????: {listing?.metadata?.bathrooms}</h4>
    //         <p style={{ marginLeft: "50px" }}>{"??????: "+listing?.metadata?.amenities}</p>
    //         <h3 style={{ marginLeft: "50px" }}> ??????</h3>

    //         {listing?.reviews?.length > 0 &&<div style={{marginLeft:'50px', marginBottom:'10px'}}>
    //             {listing.reviews.map((r, i)=>{
    //                 return <p key={i} style={{margin:'5px'}}>{"???  "+r.text}</p>
    //             })}
    //         </div>}
    //         <form onSubmit={handleSubmit} style={{marginLeft:'50px'}}>

    //             <TextField
    //                 id="title-input"
    //                 name="rating"
    //                 label="??????????????????"
    //                 type="text"
    //                 multiline
    //                 rows={3}
    //                 value={rating}
    //                 onChange={handleInputChange}
    //                 style={{ marginBottom: "10px" , width:'60%'}}
    //             />
    //             <Button variant="contained" type="submit" style={{ backgroundColor: 'grey', marginLeft: '10px' }}>
    //                 ??????
    //             </Button>

    //          </form>

    //         <div style={{ width: '200px', marginLeft: '50px', display: 'flex', height: "50px", width: "200px" }}>
    //             <DateComp style={{ zIndex: '100' }} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
    //             {listing.published ? <Button style={{ backgroundColor: 'red', marginLeft: '10px', borderRadius: "10px", color: 'white' }} variant="outlined" onClick={() => {
    //                 handleBooking()
    //                 navigate('/myBooking');
    //             }} >??????</Button> : <tagg style={{ marginLeft: '10px' }}>????????????</tagg>}
    //         </div>

    //     </div>
    //     <div style={{ height: '500px', background: 'rgb(222,222,222)' }}></div></>
  );
}

function Item(props) {
  return (
    <img
      className={`${
        props.index == 0
          ? "col-span-2 row-span-2 rounded-tl-2xl rounded-bl-2xl"
          : ""
      }
      ${props.index == 2 ? "rounded-tr-2xl" : ""}
      ${props.index == 4 ? "rounded-br-2xl" : ""}
      h-full w-full hover:brightness-90 transition-all`}
      src={props.item}
      alt=""
    />
  );
}

export default BookProp;
