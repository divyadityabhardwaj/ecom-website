class APiFeatures {
    constructor(query , queryStr){
        this.query = query; 
        this.queryStr = queryStr ; 

    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex:this.queryStr.keyword ,
                $options:"i" , 
            } ,
        } :{} ; 

        console.log(keyword);   

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        // value is not copied , memory refrence is passed , to void that use spread operator
        const queryCopy =  {...this.queryStr};

        //removing field for category 
        const removeField = ["keyword" , "page" , "limit"];

        removeField.forEach(key=>delete queryCopy[key]);

        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this ; 
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1 ; 
        const skip = (currentPage-1) * resultPerPage ; 

        this.query = this.query.limit(resultPerPage).skip(skip) ; 
        return this ; 





    }
}

export default APiFeatures;