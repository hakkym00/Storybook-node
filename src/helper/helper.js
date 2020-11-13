const moment = require('moment')

const dateFormat = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}

const truncateStr = (str) => {
    if(str.length > 50 && str.length > 0){
        let newStr = str + ' '
        newStr = str.substr(0, 250)
        newStr = str.substr(0, newStr.lastIndexOf(' '))
        newStr = newStr.length > 0 ? newStr : str.substr(0, 250)
        return newStr + '...'
    }
    return str
}

const stripTag = (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '')
}

const editIcon = (owner, user, storyId, floating = true) => {
    if(owner._id.toString() == user._id.toString()){
        return `<a href="/stories/user/edit/${storyId}" class="edit-icon" > <i class="fa fa-pencil-square-o fa-1g" ></i> </a>`
    }else{
        return ''
    }
}
const select = (selected, options) => {
    return options
    .fn(this)
    .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
    )
    .replace(
        new RegExp('>' + selected + '</option'),
        ' selected="selected"$&'        
    )
}

module.exports = {
    dateFormat,
    truncateStr,
    stripTag,
    editIcon,
    select
}