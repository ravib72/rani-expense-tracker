import moment from 'moment'


export const dateFormat = (date) =>{
    // return moment(date).format('DD/MM/YYYY')
    return moment(date).format('MM/DD/YYYY')
}