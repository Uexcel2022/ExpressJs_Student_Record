class apiFeatures {
  constructor(query, queryStr, count) {
    this.query = query;
    this.queryStr = queryStr;
    this.count = count;
    exports;
  }

  sortUrl() {
    const exclusion = ["fields", "sort", "page", "limit"];
    let urlValues = { ...this.queryStr };
    exclusion.forEach((el) => {
      delete urlValues[el];
    });

    const stringFied = JSON.stringify(urlValues);

    urlValues = JSON.parse(
      stringFied.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    this.query = this.query.find(urlValues);

    return this;
  }

  sortQueryResult() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-addmissionYear");
    }
    return this;
  }

  selectedFields() {
    if (this.queryStr.fields) {
      const fieldSelected = this.queryStr.fields.split(",").join(" ");
      this.query.select(fieldSelected);
    }
    return this;
  }
}

module.exports = apiFeatures;
