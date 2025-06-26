async function CreateReceiptPdf() {
  const accountReceiptNo = "123456";
  const canvas = document.getElementById("myCanvas");
  const dynamicData = {
      DATE_AR: "الأحد ٨ جمادي الأولى ١٤٤٦",
      DATE_EN: "Sunday, 8 Jumada al-Awwal 1446",
      DATE_NUM: "2025/10/25",
      CONTRACT_NUMBER: "24-1301-4001105-000303",
      AMOUNT: "5,560",
      HALALAS: "82",
      TENANT_NAME_AR: "مبارك ظافر مصعب الشهراني",
      TENANT_NAME_EN: "Mubarak Zafer Musab Al-Shahrani",
      AMOUNT_AR: "خمسة الآلف و خمس مئة و ستون ريالا و اثنان و ثمانون هللة",
      AMOUNT_EN: "Five thousand five hundred and sixty riyals and eighty-two halalas",
      PAYMENT_METHOD_AR: "ماستر كارد",
      PAYMENT_METHOD_EN:"Master Card",
      PAYMENT_DESC_AR: "دفعة تحت الحساب لعقد ايجار السيارة لعقد 26-1301-4001105-000303",
      PAYMENT_DESC_EN: "Payment on account for car lease contract for contract 24-1301-4001105-000303",
      NOTES_AR: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ي",
      EMPLOYEE_NAME_AR: "عيسي هاني مبروك عزام",
      EMPLOYEE_NAME_EN: "Issa Hani Mumrok Azzam",
      images: {
          background: "Taiba - Receipt Voucher.png",
          signature: "../images/signature_36.png",
            qr: "../images/BenanQR.png",
           stamp: "../images/Stamp.png",

      },
  };
  const loadedImages = await loadDynamicImages(dynamicData.images);
  const dataWithImages = { ...dynamicData, images: loadedImages };
  console.log("dataWithImages",dataWithImages);
  await drawReceipt(canvas, dataWithImages);
};




const loadDynamicImages = async (images) => {
const loadedImages = {};
for (const [key, src] of Object.entries(images)) {
  try {
      loadedImages[key] = await loadImage(src);
  } catch (error) {
      console.warn(`Using fallback for: ${key}`);
      console.warn(`Using fallback for src: ${src}`);
      loadedImages[key] = null; // استخدم null أو صورة افتراضية
  }
}
return loadedImages;
};

const loadImage = (src) => {
return new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = (error) => {
      console.error(`Failed to load image: ${src}`, error);
      reject(error);
  };
  img.src = src;
});
};

// رسم الإيصال على الـ Canvas
const drawReceipt = async (canvas, data) => {
console.log("Start drawReceipt");
const ctx = canvas.getContext("2d");

// ضبط أبعاد الـ canvas
const backgroundImg = data.images.background;
canvas.width = backgroundImg.width;
canvas.height = 1925;
ctx.drawImage(backgroundImg, 0, 0);

// إعداد النصوص والصور
const fixedConfig = {
  texts: [
      { key: "DATE_AR", x: canvas.width - 217, y: 605, align: "right" ,fontSize:49 },
      { key: "DATE_EN", x: canvas.width - 217, y: 658, align: "right" },
      { key: "DATE_NUM", x: canvas.width - 1200, y: 630, align: "right",fontSize:49 },
      { key: "CONTRACT_NUMBER", x: canvas.width - 2400, y: 605, align: "left" ,fontWeight: 'bold',fontSize:49 },
      { key: "AMOUNT", x: canvas.width - 2349, y: 690, align: "left" ,fontWeight: 'bold',fontSize:49 },
      { key: "HALALAS", x: canvas.width - 2040, y: 690, align: "left" ,fontWeight: 'bold',fontSize:49},
      { key: "TENANT_NAME_AR", x: canvas.width - 220, y: 750, align: "right" ,fontSize:49 },
      { key: "TENANT_NAME_EN", x: canvas.width - 220, y: 800, align: "right" },
      { key: "AMOUNT_AR", x: canvas.width - 270, y: 900, align: "right" ,fontSize:49},
      { key: "AMOUNT_EN", x: canvas.width - 270, y: 950, align: "right" },
      { key: "PAYMENT_METHOD_AR", x: canvas.width - 310, y: 1040, align: "right" ,fontSize:49 },
      { key: "PAYMENT_METHOD_EN", x: canvas.width - 310, y: 1090, align: "right" },
      { key: "PAYMENT_DESC_AR", x: canvas.width - 310, y: 1180, align: "right" ,fontSize:49 },
      { key: "PAYMENT_DESC_EN", x: canvas.width - 310, y: 1240, align: "right" },
      { key: "NOTES_AR", x: canvas.width - 255, y: 1340, align: "right"  ,fontSize:49 },
      { key: "EMPLOYEE_NAME_AR", x: canvas.width - 200, y: 1460, align: "right"  ,fontSize:49 },
      { key: "EMPLOYEE_NAME_EN", x: canvas.width - 200, y: 1500, align: "right" },
  ],
  images: [
      { content: data.images.signature, x: canvas.width - 892, y: 1432, width: 173, height: 85 },
      { content: data.images.qr, x: canvas.width - 2402, y: 1425, width: 180, height: 180 },
      { content: data.images.stamp, x: canvas.width - 370, y: 1528, width: 168, height: 170 },
  ],
    textStyle: {
      fontWeight: "normal",
      fontSize: 35,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
    },
   
};
  await document.fonts.load(`${fixedConfig.textStyle.fontWeight} ${fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`);

ctx.font = `${fixedConfig.textStyle.fontWeight} ${fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`;
ctx.fillStyle = fixedConfig.textStyle.textColor;

  // رسم النصوص
  fixedConfig.texts.forEach(({ key, x, y, align, fontSize, fontWeight }) => {
    const content = data[key] || "";

    const size = fontSize || fixedConfig.textStyle.fontSize;
    const weight = fontWeight || fixedConfig.textStyle.fontWeight;

    ctx.font = `${weight} ${size}px ${fixedConfig.textStyle.fontFamily}`;
    ctx.fillStyle = fixedConfig.textStyle.textColor;

    const textWidth = ctx.measureText(content).width;
    let adjustedX = x;
    if (align === "right") adjustedX = x - textWidth;
    else if (align === "center") adjustedX = x - textWidth / 2;

    ctx.fillText(content, adjustedX, y);
  });
// رسم الصور
fixedConfig.images.forEach(({ content, x, y, width, height }) => {
  // التحقق من ان الصورة موجوده
  if (content) {    
    ctx.drawImage(content, x, y, width, height);
  } else {
    console.warn("Image not found or not loaded, skipping.");
  }
});
};



CreateReceiptPdf()