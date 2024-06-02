import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';

import DiscountIcon from '../assets/images/discountIcon.png'
import ProfitIcon from "../assets/images/profit.png";
import QuantityIcon from "../assets/images/quantity.png";
import SalesIcon from "../assets/images/sales.png";

import { CardDiv } from "../Components/UI/Card";
import { PieChart } from '../Components/UI/Charts/PieChart';
import { BarChart } from "../Components/UI/Charts/BarChart";

import { useTheme } from '@mui/material/styles';

import { getDashboardData, getFilteredData } from "../Services";
import { DashboardList } from '../Components/UI/DashboardList';

export const Dashboard = () => {
  const [states, setStates] = useState([]);
  const [uniqueOrderDate, setUniqueOrderDate] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState();

  const theme = useTheme()

  useEffect(() => {
    getDashboardData()
      .then(result => {
        if(result.success) {
          setStates(result.states)
          setUniqueOrderDate(result.uniqueOrderDate)
          setSelectedState(result.states[0]);
          setFromDate(result.fromDate);
          setToDate(result.toDate);
          setMinDate(result.fromDate);
          setMaxDate(result.toDate);
          setFilteredData(result.filteredData);
          getStateData({
            state : result.states[0],
            fromDate : result.fromDate,
            toDate : result.toDate,
            filteredData : result.filteredData
          });
        } else alert('Something went wrong!');
      })
      .catch(err => {
        alert('Something went wrong!');
      });
  }, []);

  const getStateData = (paramData) => {
    let totalSales = 0;
    let quantitySold = 0;
    let discount = 0;
    let profit = 0;
    let saleByCity = {};
    let saleByProduct = {};
    let saleByCategory = {};
    let saleBySubCategory = {};
    let saleBySegment = {};
    paramData.filteredData.filter(data => {
      if(new Date(data["Order Date"]) >= new Date(paramData.fromDate) && new Date(data["Order Date"]) <= new Date(paramData.toDate)) {
        
        totalSales += data.Sales;
        quantitySold += data.Quantity;
        discount += data.Discount;
        profit += data.Profit;

        if(saleByCity[data.City]) {
          saleByCity[data.City] += data.Sales;
        } else {
          saleByCity[data.City] = data.Sales;
        }
        if(saleByProduct[data['Product Name']]) {
          saleByProduct[data['Product Name']] += data.Sales;
        } else {
          saleByProduct[data['Product Name']] = data.Sales;
        }
        if(saleByCategory[data.Category]) {
          saleByCategory[data.Category] += data.Sales;
        } else {
          saleByCategory[data.Category] = data.Sales;
        }
        if(saleBySubCategory[data["Sub-Category"]]) {
          saleBySubCategory[data["Sub-Category"]] += data.Sales;
        } else {
          saleBySubCategory[data["Sub-Category"]] = data.Sales;
        }
        if(saleBySegment[data.Segment]) {
          saleBySegment[data.Segment] += data.Sales;
        } else {
          saleBySegment[data.Segment] = data.Sales;
        }
      }
    });
    totalSales = totalSales.toFixed(2);
    profit = profit.toFixed(2);
    discount = discount.toFixed(2);
    setData({totalSales, quantitySold, discount, profit, saleByCity, saleByProduct,saleByCategory, saleBySubCategory, saleBySegment});
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    let dataToSend = {
      fromDate : fromDate,
      toDate : toDate,
      state : selectedState,
      filteredData : filteredData
    }
    if(name === 'fromDate') {
      setFromDate(value);
      dataToSend.fromDate = value;
    } else {
      setToDate(value);
      dataToSend.toDate = value;
    }
    getStateData(dataToSend);
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    const dataToSend = {
      state : e.target.value
    }

  getFilteredData(dataToSend)
      .then(result => {
        if(result.success) {
          setFromDate(result.fromDate);
          setToDate(result.toDate);
          setMinDate(result.fromDate);
          setMaxDate(result.toDate);
          setFilteredData(result.filteredData);
          getStateData({
            state : e.target.value,
            fromDate : result.fromDate,
            toDate : result.toDate,
            filteredData : result.filteredData
          });
        } else {
          alert('Something went wrong!');
        }
      })
      .catch(err => {
        alert('Something went wrong!');
      })
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  return (
    <Container className="mainContainer" style={{background: theme.palette.background.default}} maxWidth={false} >
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary}}>
            Sales Overview
          </Typography>
        </Grid>
          <Grid item xs={12} md={2}>
            <label style={{color: theme.palette.text.primary}}>Select a State</label>
            <select value={selectedState}
            className='my-select'
              onChange={(e) => handleStateChange(e)}>
              {
                states.length > 0 && states.map((state, key) => {
                  return <option value={state} key={key}>{state}</option>                
                }) 
              }
            </select>
          </Grid>
          <Grid item xs={12} md={2}>
            <label style={{color: theme.palette.text.primary}}>Select From Date</label>
            <select value={fromDate}
            name='fromDate'
            className='my-select'
              onChange={(e) => handleChange(e)}>
              {
                uniqueOrderDate.length > 0 && uniqueOrderDate.map((date, key) => {
                  return <option value={date} key={key}>{formatDate(date)}</option>                
                }) 
              }
            </select>
          </Grid>
          <Grid item xs={12} md={2}>
            <label style={{color: theme.palette.text.primary}}>Select To Date</label>
            <select value={toDate}
              name='toDate'
              className='my-select'
                onChange={(e) => handleChange(e)}>
                {
                  uniqueOrderDate.length > 0 && uniqueOrderDate.map((date, key) => {
                    return <option value={date} key={key}>{formatDate(date)}</option>                
                  }) 
                }
            </select>
          </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} md={3}>
          <CardDiv
            icon={SalesIcon}
            title={"Total Sales"}
            number={data.totalSales ? `$ ${data.totalSales}` : 0}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardDiv
            icon={QuantityIcon}
            title={"Quantity Sold"}
            number={data.quantitySold ? data.quantitySold : 0}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardDiv 
            icon={DiscountIcon} 
            title={"Discount%"} 
            number={data.discount ? `${data.discount}%` : 0} />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardDiv 
            icon={ProfitIcon} 
            title={"Profit"} 
            number={data.profit ? `$ ${data.profit}` : 0} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "20px" }}
        className='grid_box'
      >
        <Grid item xs={12} md={6}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <BarChart data={data.saleByCity ? data.saleByCity : {}}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} className='Gridbox'>
            <DashboardList title={"Sales By Products"} columnOne={"Product Name"} columnTwo={"Sales in $"}  listData={data.saleByProduct ? data.saleByProduct : {}} />
        </Grid>
        
      </Grid>
      <Grid 
        container 
        spacing={2} 
        alignItems="center" 
        style={{ marginBottom: "20px" }}
        className='gridBox'>
        <Grid item xs={12} md={4}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <PieChart value={data.saleByCategory ? data.saleByCategory : []} title={'Sales By Category'} type="pie" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardList title={"Sales By Sub Category"} columnOne={"Sub Category"} columnTwo={"Sales in $"} listData={data.saleBySubCategory ? data.saleBySubCategory : {}} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <PieChart value={data.saleBySegment ? data.saleBySegment : []} title={'Sales By Segment'} type="pie" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
