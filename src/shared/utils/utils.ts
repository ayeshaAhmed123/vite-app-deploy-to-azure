import { IndiciDateFormatWithoutTime } from './DateFormat';


export const getInitials = (string) => {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `( ${age} Y )`; //")" + " Years";
};

export const getOptionsArray = (
  data = [],
  labelText: string,
  valueText: string
) => {
  const optionArray = [] as any;
  // eslint-disable-next-line array-callback-return
  data?.map((option: any) => {
    optionArray.push({
      label: option[labelText ? labelText : ''],
      value: option[valueText],
    });
  });
  return optionArray;
};
export const getOptionsArrayWithAllKeys = (
  data = [],
  labelText: string,
  valueText: string
) => {
  const optionArray = [] as any;
  // eslint-disable-next-line array-callback-return
  data.map((option: any) => {
    optionArray.push({
      label: option[labelText],
      value: option[valueText],
      ...option,
    });
  });
  return optionArray;
};

export const isEmptyString = (data: any) => {
  if (data !== null && data !== "" && data !== undefined) {
    return false;
  } else {
    return true;
  }
};

// Function to remove HTML tags
export const stripHtmlTags = (htmlString: string) => {
  const divElement = document.createElement('div');
  divElement.innerHTML = htmlString;
  return divElement.textContent || divElement.innerText || '';
};

// Function to get Options array which are not confidentials 
export const getOptionsArrayNotConfidentials = (
  data = [],
  labelText: string,
  valueText: string
) => {
  const optionArray = [] as any;
  // eslint-disable-next-line array-callback-return
  data?.map((option: any) => {
    if (option?.isconfidential == false) {
      const date: any = IndiciDateFormatWithoutTime(option.onSetDate)
      const diseaseName: any = option[labelText].split('</span>')
      const lab: any = stripHtmlTags(diseaseName[0])

      optionArray.push({
        label: `${lab} [ ${date} ]`,
        value: option[valueText],
        heading: lab,
        isHighlighted: option['isHighlighted']
      });
    }
  });
  return optionArray;
};