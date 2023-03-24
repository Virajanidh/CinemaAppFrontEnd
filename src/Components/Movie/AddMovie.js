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
import { UserActions } from '../../Actions/UserActions';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import CustomCalendar from './assets/CustomCalender';
import ShowCustomCalendar from './assets/ShowCustomCalender';
import ShowTimes from './assets/ShowTimes';
import { MovieActions } from '../../Actions/MovieActions';


const { Text } = Typography;
const { TextArea } = Input;
const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic (CAR)", "Chad", "Chile", "China", "Colombia", "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (formerly Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Sri Lanka","Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea"]


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

function AddMovie() {


    const [releaseDate,setReleaseDate]=useState("");
    const [showArray,setShowArray]=useState([]);
    const [showTimeArray,setShowTimeArray]=useState([]);
   // const [duration, setDuration] = useState(null);
    const { isSignIn, signInError,userInfomation } = useSelector((state) => state.user)
  

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const seatNo = [...new Array(10001)]
        .map((each, index) => ({ label: index, value: index }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        var h=values.duration.$H
        var m=values.duration.$m
        var dur=h+":"+m
        const data =
        {
            title: values.movieName,

            country: values.country,
            description: values.description,
            language: values.language,
            releaseDate:releaseDate,
            showDays:showArray,
            showTimes:showTimeArray,
            // show :{ //show return array
            //     start_time:
            //     end_time:
            //     date:
            // },
            currentCinemaUserid: userInfomation.cinemaId,
            movieDuration:dur
        }
        console.log(data)
       dispatch(MovieActions.addMovie(data))
       dispatch(MovieActions.getMovies(userInfomation.cinemaId))


    }

    
    const handleReleaseDateChange=(newDate)=>{
        setReleaseDate(newDate);
        console.log(newDate)
      }
    const handleShowDaysChange=(newElement)=>{
        const newArray = [...showArray, newElement];
        setShowArray(newArray)
        console.log(showArray)
    }
    const handleShowTimes=(newElement)=>{
        const newArray=[...showTimeArray,newElement]
        setShowTimeArray(newArray)
    }

    return (
        <div>

            <Card
                
                style={{
                    width: 1000,
                    xs: {
                        width: 1000
                    }
                }}

            >
                <div>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"

                        style={{ maxWidth: 800 }}

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

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

                        <Form.Item
                            label="Movie Duration (hours:minutes)"
                            name="duration"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input the movie duration!',
                                },
                            ]}
                        >
                            <TimePicker defaultValue={dayjs('2:30', format)} format={format} />
                        </Form.Item >

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
                            <CustomCalendar label="Release Date" onDateChange={handleReleaseDateChange}/>
                            
                        </Form.Item>
                        

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
                            
                        </Form.Item>

                        <Form.Item
                        label="Show times"
                        name="showDay"
                        >
                            <ShowTimes label="Show times" onDateChange={handleShowTimes}/>
                            {showTimeArray.map((country) => (
                                <Alert message={JSON.stringify(country)} type="success" />
                                    ))}
                        </Form.Item>

                       






                        <Form.Item label="Upload" valuePropName="fileList">
                            <Upload action="/upload.do" listType="picture-card">
                                <div>
                                    {/* <PlusOutlined /> */}
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Button">
                            <Button type="primary" htmlType="submit" >
                                Add
                            </Button>
                        </Form.Item>
                        {/* {signInError ? <Text wrapperCol={{
                            offset: 8,
                            span: 16,
                        }} type="danger">{signInError}</Text> : null} */}
                    </Form>

                </div>
            </Card>
        </div>
    )
}
export default AddMovie;