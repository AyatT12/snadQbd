async function CreateReceiptPdf() {
  const accountReceiptNo = "123456";
  const canvas = document.getElementById("myCanvas");

  const dynamicData = {
    CONTRACT_NUMBER: "24-1301-4001105-000303",
    DATE_AR: "الأحد ٨ جمادي الأولى ١٤٤٦",
    DATE_Num: "25/10/2024",
    DATE_EN: "Sunday, 8 Jumada al-Awwal 1446",
    START_DATE_AR:  "الأحد ٨ جمادي الأولى ١٤٤٦",
    START_DATE_EN: "Sunday, 8 Jumada al-Awwal 1446",
    START_DATE_NUM:"25/10/2024",
    END_DATE_AR:  "الأحد ٨ جمادي الأولى ١٤٤٦",
    END_DATE_EN: "Sunday, 8 Jumada al-Awwal 1446",
    END_DATE_NUM:"25/10/2024",
    REFERENCE_AR: "إنشاء عقد",
    REFERENCE_EN: "Create Contract",
    REFERENCE_NUM :`(${"24-1301-4001105-000303"})`,
    TENANT_NAME_AR: "مبارك ظافر مصعب الشهراني",
    TENANT_NAME_EN: "Mubarak Zafer Musab Al-Shahrani ",
    CAR_DESCRIPTION_AR:"هيونداي - سوناتا - سيدان متوسطة -٢٠٢٠ - د و د - ٣٣٢٨ - ازرق",
    CAR_DESCRIPTION_EN:"Hyundai - Sonata - medium sedan - 2020 - D E D - 3328 - blue",
    EMPLOYEE_AR: " عيسي هاني مبروك عزام",
    EMPLOYEE_EN: "Issa Hani Mumrok Azzam",
    images: {
      background: "Taiba - Proforma Invoice - Empty-01.png",
      signature: "../images/signature_08.png",
      qr: "../images/BenanQR.png",
      stamp: "../images/Stamp.png",
    },
    Serviceitems: [
      { arabic: "الايجار", english: "Rent" },
      { arabic: "السائق الاضافي", english: "Add Driver" },
      { arabic: "الوقود", english: "fuel" },
      { arabic: "التفويض", english: "Delegation" },
    ],
    Valueitems: [
      { content: "320.00" },
      { content: "1000,000.00" },
      { sum: "1000,000.00" },
    ],
    Numberitems: [
      { content: "320.00" },
      { content: "50.00" },
      
      { content: "0.00" },
    ],
    Amountitems: [
      { content: "320.00" },
      { content: "50.00" },
      { sum: "1000,000.00"  },
    ],
    Discountitems: [
      { content: "320.00" },
      { content: "50.00" },
      { sum: "1000,000.00"  },
    ],
    AfterDiscountitems: [
      { content: "320.00" },
      { content: "50.00" },
      { sum: "1000,000.00"  },
    ],
    VATitems: [{ content: "320.00" }, { content: "50.00" }, { sum: "1000,000.00"  }],
    Totalitems: [
      { content: "320.00" },
      { content: "50.00" },
      { sum: "1000,000.00"  },
    ],
  };

  const loadedImages = await loadDynamicImages(dynamicData.images);
  const dataWithImages = { ...dynamicData, images: loadedImages };
  console.log("dataWithImages", dataWithImages);
  await drawReceipt(canvas, dataWithImages);
  createPdf(
    accountReceiptNo,
    canvas,
    "SavePdfReceipt",
    "Contract_AccountReceiptNo"
  );
}

//  لتحميل الصور
const loadDynamicImages = async (images) => {
  const loadedImages = {};
  for (const [key, src] of Object.entries(images)) {
    try {
      loadedImages[key] = await loadImage(src);
    } catch (error) {
      console.warn(`استخدام النسخة الاحتياطية لـ: ${key}`);
      loadedImages[key] = null;
    }
  }
  return loadedImages;
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error(`فشل تحميل الصورة: ${src}`, error);
      reject(error);
    };
    img.src = src;
  });
};

//  لرسم الإيصال على الصورة
const drawReceipt = async (canvas, data) => {
  console.log("بدء رسم الإيصال");
  const ctx = canvas.getContext("2d");

  // إعداد حجم الصورة بناءً على صورة الخلفية
  const backgroundImg = data.images.background;
  canvas.width = backgroundImg.width;
  canvas.height = backgroundImg.height;
  ctx.drawImage(backgroundImg, 0, 0);

  // إعدادات النصوص والصور
  const fixedConfig = {
    texts: [
      {
        key: "CONTRACT_NUMBER",x: canvas.width - 2390,y: 714,align: "left",fontWeight: 'bold',fontSize:60,},

      { key: "DATE_AR", x: canvas.width - 240, y: 700, align: "right" , fontSize:49 },
      { key: "DATE_EN", x: canvas.width - 240, y: 753, align: "right"},
      { key: "DATE_Num", x: canvas.width - 1220, y: 720, align: "right" , fontSize:49 },

      { key: "START_DATE_AR", x: canvas.width - 305, y: 840, align: "right" , fontSize:49 },
      { key: "START_DATE_EN", x: canvas.width - 305, y: 895, align: "right"},
      { key: "START_DATE_NUM", x: canvas.width - 1256, y: 870, align: "right" , fontSize:49 },

      { key: "END_DATE_AR", x: canvas.width - 442, y: 992, align: "right" , fontSize:49 },
      { key: "END_DATE_EN", x: canvas.width - 442, y: 1040, align: "right"},
      { key: "END_DATE_NUM", x: canvas.width - 1256, y: 1020, align: "right" , fontSize:49 },

      { key: "REFERENCE_AR", x: canvas.width - 225, y: 1140, align: "right", fontSize:49},
      { key: "REFERENCE_EN", x: canvas.width - 225, y: 1195, align: "right"},

      { key: "REFERENCE_NUM", x: canvas.width - 520, y: 1168, align: "right" , fontSize:49},

      { key: "TENANT_NAME_AR", x: canvas.width - 250, y: 1295, align: "right"  , fontSize:49},
      { key: "TENANT_NAME_EN", x: canvas.width - 250, y: 1350, align: "right"},

      { key: "CAR_DESCRIPTION_AR", x: canvas.width - 250, y: 1435, align: "right", fontSize:49},
      { key: "CAR_DESCRIPTION_EN", x: canvas.width - 250, y: 1485, align: "right"},

      { key: "EMPLOYEE_AR", x: canvas.width - 255, y: 2940, align: "right" , fontWeight: 'bold', fontSize:49},
      { key: "EMPLOYEE_EN", x: canvas.width - 255, y: 2995, align: "right" ,fontWeight: 'bold' },
    ],
    images: [
      {
        content: data.images.signature,
        x: canvas.width - 1263,
        y: 2898,
        width: 297,
        height: 129,
      },
      {
        content: data.images.qr,
        x: canvas.width - 2355,
        y: 775,
        width: 390,
        height: 400,
      },
      {
        content: data.images.stamp,
        x: canvas.width - 475,
        y: 3052,
        width: 296,
        height: 255,
      },
    ],
    textStyle: {
      fontWeight: "normal",
      fontSize: 35,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
    },
    tableStyle: {
      fontWeight: "normal",
      fontSize: 42,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
      textAlign:"right"
    },
  };
  await document.fonts.load(
    `${fixedConfig.textStyle.fontWeight} ${fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`
  );
  await document.fonts.load(
    `${fixedConfig.tableStyle.fontWeight} ${fixedConfig.tableStyle.fontSize}px ${fixedConfig.tableStyle.fontFamily}`
  );

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
    if (content) {
      // تحقق مما إذا كانت الصورة محملة
      ctx.drawImage(content, x, y, width, height);
    } else {
      console.warn("الصورة غير موجودة أو لم يتم تحميلها، يتم تخطيها.");
    }
  });

  // رسم الجدول (عناصر الخدمة)
  const startY = 1705;
  const increment = 117.5;
 if (data.Serviceitems && data.Serviceitems.length > 0) {
  data.Serviceitems.forEach((item, i) => {
    ctx.fillStyle = fixedConfig.tableStyle.textColor;

    // Arabic 
    ctx.font = `${'bold'} ${fixedConfig.tableStyle.fontSize}px ${fixedConfig.tableStyle.fontFamily}`;
    const arabicTextWidth = ctx.measureText(item.arabic).width;
    let adjustedXArabic = canvas.width - 140 - arabicTextWidth;
    ctx.fillText(item.arabic, adjustedXArabic, startY + i * increment);

    // English 
    ctx.font = `35px ${fixedConfig.tableStyle.fontFamily}`;
    const englishTextWidth = ctx.measureText(item.english).width;
    let adjustedXEnglish = canvas.width - 140 - englishTextWidth;
    ctx.fillText(item.english, adjustedXEnglish, startY + i * increment + 45);
  });
}


  //  لرسم العناصر في تنسيق جدول
const startYForNumbers = 1730;
const drawItems = (items, xPosition, startY, align) => {
  if (!items || items.length === 0) return;
  items.forEach((item, i) => {
    ctx.font = `${fixedConfig.tableStyle.fontWeight} ${fixedConfig.tableStyle.fontSize}px ${fixedConfig.tableStyle.fontFamily}`;
    ctx.fillStyle = fixedConfig.tableStyle.textColor;

    // القيم
    if (item.content) {
      const textWidth = ctx.measureText(item.content).width;
      let adjustedX = xPosition;
      if (align === "right") adjustedX = xPosition - textWidth;
      else if (align === "center") adjustedX = xPosition - textWidth / 2;

      ctx.fillText(item.content, adjustedX, startY + i * increment);
    }

    //المجموع
    if (item.sum) {
      const sumTextWidth = ctx.measureText(item.sum).width;
      let adjustedSumX = xPosition;
      if (align === "right") adjustedSumX = xPosition - sumTextWidth;
      else if (align === "center") adjustedSumX = xPosition - sumTextWidth / 2;

      ctx.fillText(item.sum, adjustedSumX, 2820);
    }
  });
};


  // رسم جميع فئات العناصر
  drawItems(data.Valueitems, canvas.width - 580, startYForNumbers, "center");
  drawItems(data.Numberitems, canvas.width - 830, startYForNumbers, "center");
  drawItems(data.Amountitems, canvas.width - 1085, startYForNumbers, "center");
  drawItems(
    data.Discountitems,
    canvas.width - 1360,
    startYForNumbers,
    "center"
  );
  drawItems(
    data.AfterDiscountitems,
    canvas.width - 1640,
    startYForNumbers,
    "center"
  );
  drawItems(data.VATitems, canvas.width - 1930, startYForNumbers, "center");
  drawItems(data.Totalitems, canvas.width - 2220, startYForNumbers, "center");
};

CreateReceiptPdf();
