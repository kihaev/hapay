export function validationPatterns() {
  return {
    basicInformation: {
      firstName: "^([a-zA-Z]+['.-]?[ ]?)*$",
      lastName: "^([a-zA-Z]+['.-]?[ ]?)*$",
      emailAddress:
        "^[a-zA-Z0-9]+([-._]?[a-zA-Z0-9]+){0,2}@[a-z0-9]+[-]?([-]?[a-z0-9])+[.]([a-z]{2,})$",
      address: "[A-Za-z0-9 ]*",
      state: "[A-Za-z ]*",
      phoneNumber: "[0-9]{11}",
      city: "[A-Za-z ]{1,32}",
      zip: "[0-9]{1,6}"
    },
    payment: {
      name: /^([^0-9]*)$/,
      cardNumber: "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$",
      expirationDate: "^[0-9]{4}$",
      cvv: "^[0-9]{3,4}$"
    },
    rentalHistory: {
      firstName: "^([a-zA-Z]+['.-]?[ ]?)*$",
      lastName: "^([a-zA-Z]+['.-]?[ ]?)*$",
      address: "[A-Za-z0-9]{3,*}",
      city: "[A-Za-z]{1,*}",
      state: "[A-Za-z]{1,*}",
      zip: "[0-9]{1,8}"
    },
    sharedPatterns: {
      emailAddress: "^([a-zA-Z0-9_-]+\\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$",
      phoneNumber: "^\\+?[0-9]{1} ?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$",
      name: "^([a-zA-Z]+['.-]?[ ]?)*$"
    },
    leaseTerms: {
      leaseTerm: "[0-9]{1,8}"
    },
  };
}
