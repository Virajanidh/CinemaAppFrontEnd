import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
    Card, Space,
    Tag,
    Typography,
    Calendar,
    Alert
} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import CustomCalendar from './assets/CustomCalender';
import ShowCustomCalendar from './assets/ShowCustomCalender';
import ShowTimes from './assets/ShowTimes';
import { MovieActions } from '../../Actions/MovieActions';

import { storage } from "../../firebase";
import {db} from "../../firebase";

const { Text } = Typography;
const { TextArea } = Input;
const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic (CAR)", "Chad", "Chile", "China", "Colombia", "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (formerly Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Sri Lanka", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea"]


const languageList = ["English", "Sinhala",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
    "Korean",
    "Russian",
    "Arabic",
    "Portuguese",
    "Hindi",
    "Bengali",
    "Punjabi",
    "Swahili",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Finnish",
    "Danish",
    "Greek",
    "Turkish",
    "Hebrew",
    "Thai",
    "Vietnamese",
    "Indonesian",
    "Malay",
    "Tagalog",
];
const format = 'HH:mm';

function EditMovie(props) {

    const initialValues = {
        movieName: props.movie.title,
        description: props.movie.description,
        country: props.movie.country,
        language: props.movie.language,
        releaseDate: props.movie.releaseDate,
        durationDup: props.movie.movieDuration

    };

    const [releaseDate, setReleaseDate] = useState("");
    const [showArray, setShowArray] = useState([]);
    const [showTimeArray, setShowTimeArray] = useState([]);
    // const [duration, setDuration] = useState(null);
    const { isSignIn, signInError, userInfomation } = useSelector((state) => state.user)
    const [isShowDayChange, setShowdayChange] = useState(false)
    const [isRelDateChange, setRelDateChange] = useState(false)
    const [downloadURL,setdownloadURL]=useState(props.movie.imgUrl);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const seatNo = [...new Array(10001)]
        .map((each, index) => ({ label: index, value: index }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = async (values) => {
        console.log(values.duration)
        // if(values.duration!=='undefined'){
        //     var h = values.duration.$H
        // var m = values.duration.$m
        // var dur = h + ":" + m
        // }
        // else{
        //     var dur=props.movie.movieDuration
        // }
        var dur = props.movie.movieDuration

        if (values.releaseDate !== 'undefined' | values.releaseDate == null) {
            var rel = releaseDate
        }
        else {
            var rel = props.movie.releaseDate
        }

        

        const data =
        {
            title: values.movieName,

            country: values.country,
            description: values.description,
            language: values.language,
            releaseDate: rel,
            // showDays: showArray,
            // showTimes: showTimeArray,
            currentCinemaUserid: userInfomation.cinemaId,
            movieDuration: dur,
            imgUrl:downloadURL
        }
        console.log(data)
        dispatch(MovieActions.editMovie(data, props.movie.movieId))
        dispatch(MovieActions.getMovies(userInfomation.cinemaId))
        updateMoviesList()

    }
    const updateMoviesList = async()=> {
        try {
            await dispatch(MovieActions.getMovies(userInfomation.cinemaId))
        }
        catch (error) {
            console.log('error in movie list updating')
        }

    }

    const HandleShowDurationChange = () => {
        setShowdayChange(true)
    }
    const cancelHandleShowDurationChange = () => {
        setShowdayChange(false)
    }
    const HandleRelDateChange = () => {
        setRelDateChange(true)
    }
    const cancelHandleRelDateChange = () => {
        setRelDateChange(false)
    }


    const handleReleaseDateChange = (newDate) => {
        setReleaseDate(newDate);
        console.log(newDate)
    }
    const handleShowDaysChange = (newElement) => {
        const newArray = [...showArray, newElement];
        setShowArray(newArray)
        console.log(showArray)
    }
    const handleShowTimes = (newElement) => {
        const newArray = [...showTimeArray, newElement]
        setShowTimeArray(newArray)
    }

    const beforeUpload = (file) => {
        // You can add additional file validation here if needed, like checking file size or type
        handleUpload(file);
        return false; // Return false to prevent Ant Design's default file upload behavior
      };
      
      //const storage = firebase.storage();
      const storageRef = storage.ref();

    const handleUpload = async (file) => {
        // try {
        //   const snapshot = await storageRef.child(file.name).put(file.originFileObj);
        //   const downloadUrl = await snapshot.ref.getDownloadURL();
        //   setdownloadURL(downloadUrl)
        //   console.log("File uploaded successfully:", downloadUrl);
        //   // You can do something with the downloadUrl, like saving it to your database or showing it in your UI
        // } catch (error) {
        //   console.error("Error uploading file:", error);
        //   message.error("Error uploading file");
        // }
        const caseId="C001"
        const uploadTask = storage.ref(`Cases/${caseId}/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            
          },
          (error) => console.log(error),
          () => {
            storage
              .ref("Cases")
              .child(caseId)
              .child(file.name)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                setdownloadURL(url)
              });
          }
        );
      };
    return (
        <div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"

                style={{ maxWidth: 800 }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={initialValues}

            >

                <Form.Item
                    label="Movie Title"
                    name="movieName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input movie title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Movie description"
                    name='description'
                    rules={[
                        {
                            required: true,
                            message: 'Please input movie title!',
                        },
                    ]}>
                    <TextArea rows={4} />
                </Form.Item>



                <Form.Item
                    label="language"
                    name="language"
                    rules={[{
                        required: true,
                        message: 'Please select a language!'
                    }]}>
                    <Select id="language"
                    // value={selectedCity}
                    // onChange={(e) => setSelectedCity(e.target.value)}
                    >

                        {languageList.map((language) => (
                            <Select.Option key={language} value={language}>
                                {language}
                            </Select.Option>))}


                    </Select>
                </Form.Item>
                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{
                        required: true,
                        message: 'Please select a country!'
                    }]}>
                    <Select id="country"
                    // value={selectedCity}
                    // onChange={(e) => setSelectedCity(e.target.value)}
                    >

                        {countryList.map((country) => (
                            <Select.Option key={country} value={country}>
                                {country}
                            </Select.Option>))}


                    </Select>
                </Form.Item>
                {isShowDayChange ?
                    <Form.Item
                        label="Movie Duration (h:m)"
                        name="duration"
                        rules={[
                            {
                                required: false,
                                message: 'Please input the movie duration!',
                            },
                        ]}
                    >
                        <TimePicker defaultValue={dayjs('2:30', format)} format={format} />
                        <Button onClick={cancelHandleShowDurationChange}>cancel</Button>
                    </Form.Item > :
                    <Form.Item
                        label="Movie Duration (h:m)"
                        name="durationDup"
                    >
                        <Input value={props.movie.movieDuration} disabled='true' />
                        <Button onClick={HandleShowDurationChange}>change</Button>

                    </Form.Item>
                }
                {
                    isRelDateChange ?
                        <Form.Item
                            label="Movie release date "
                            name="releaseDate"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input movie release date!',
                                },
                            ]}
                        >
                            <CustomCalendar label="Release Date" onDateChange={handleReleaseDateChange} />
                            <Button onClick={cancelHandleRelDateChange}>cancel</Button>
                        </Form.Item> :
                        <Form.Item
                            label="Movie release date "
                            name="releaseDate"
                        >
                            <Input value={props.movie.releaseDate} disabled='true' />
                            <Button onClick={HandleRelDateChange}>change</Button>

                        </Form.Item>

                }

                {/* 
                        <Form.Item
                            label="Show days "
                            name="showDay"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input movie show days!',
                                },
                            ]}
                        >
                            <ShowCustomCalendar label="Show Days" onDateChange={handleShowDaysChange}/>
                            {showArray.map((country) => (
                                <Alert message={JSON.stringify(country)} type="success" />
                                    ))}

                            {/* <Alert message={date.toString()} type="success" /> */}

                {/* </Form.Item>

                        <Form.Item
                        label="Show times"
                        name="showDay"
                        >
                            <ShowTimes label="Show times" onDateChange={handleShowTimes}/>
                            {showTimeArray.map((country) => (
                                <Alert message={JSON.stringify(country)} type="success" />
                                    ))}
                        </Form.Item> */}








                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card" beforeUpload={beforeUpload}>
                        <div>
                            {/* <PlusOutlined /> */}
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item label="Button">
                    <Button type="primary" htmlType="submit" >
                        Update
                    </Button>
                </Form.Item>
                {/* {signInError ? <Text wrapperCol={{
                            offset: 8,
                            span: 16,
                        }} type="danger">{signInError}</Text> : null} */}
            </Form>
        </div>
    );



}
export default EditMovie;