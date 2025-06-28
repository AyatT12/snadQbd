async function createAndDisplayReceipt() {
  try {
    const canvas = document.createElement("canvas");
    const dynamicData = {
      CONTRACT_NUMBER: "24-1301-4001105-000303",
      DATE_AR: "الأحد ٨ جمادي الأولى ١٤٤٦",
      DATE_Num: "2025/10/25",
      DATE_EN: "Sunday, 8 Jumada al-Awwal 1446",
      REFERENCE_AR: "إنشاء عقد",
      REFERENCE_EN: "Create Contract",
      REFERENCE_NUM: `(${"24-1301-4001105-000303"})`,
      TENANT_NAME_AR: "مبارك ظافر مصعب الشهراني",
      TENANT_NAME_EN: "Mubarak Zafer Musab Al-Shahrani",
      CAR_DESCRIPTION_AR:
        "هيونداي - سوناتا - سيدان متوسطة -٢٠٢٠ - د و د - ٣٣٢٨ - ازرق",
      CAR_DESCRIPTION_EN:
        "Hyundai - Sonata - medium sedan - 2020 - D E D - 3328 - blue",
      EMPLOYEE_AR: "عيسي هاني مبروك عزام",
      EMPLOYEE_EN: "Issa Hani Mumrok Azzam",
      images: {
        background: "Taiba - Simplified Tax Invoice-01.png",
        signature: "../images/signature_36.png",
        qr: "../images/BenanQR.png",
        stamp: "../images/Stamp.png",
      },
      Serviceitems: [
        { arabic: "الايجار", english: "Rent" },
        { arabic: "السائق الاضافي", english: "Add Driver" },
        { arabic: "الوقود", english: "fuel" },
        { arabic: "التفويض", english: "Delegation" },
        { arabic: "التفويض", english: "Delegation" },
        { arabic: "التفويض", english: "Delegation" },
        { arabic: "التفويض", english: "Delegation" },
        { arabic: "التفويض", english: "Delegation" },
        { arabic: "التفويض", english: "Delegation" },
        { arabic: "الايجار", english: "Rent" },
        { arabic: "السائق الاضافي", english: "Add Driver" },
        { arabic: "الوقود", english: "fuel" },
      ],
      Valueitems: [{ content: "500.00" }, { content: "1,000.00" }],
      Numberitems: [{ content: "320.00" }, { content: "50.00" }],
      Amountitems: [
        { content: "320.00" },
        { content: "50.00" },
        { sum: "370.00" },
      ],
      Discountitems: [
        { content: "320.00" },
        { content: "500,000.00" },
        { sum: "370.00" },
      ],
      AfterDiscountitems: [
        { content: "320.00" },
        { content: "50.00" },
        { sum: "370.00" },
      ],
      VATitems: [
        { content: "320.00" },
        { content: "50.00" },
        { sum: "370.00" },
      ],
      Totalitems: [
        { content: "320.00" },
        { content: "50.00" },
        { sum: "370.00" },
      ],
    };

    const loadedImages = await loadDynamicImages(dynamicData.images);
    const dataWithImages = { ...dynamicData, images: loadedImages };

    await drawReceipt(canvas, dataWithImages);

    displayResultInNewWindow(canvas);
  } catch (error) {
    console.error("Error generating receipt:", error);
    const errorWindow = window.open();
    errorWindow.document.write(`<h1>Error</h1><p>${error.message}</p>`);
  }
}

//  لتحميل الصور
async function loadDynamicImages(images) {
  const loadedImages = {};
  for (const [key, src] of Object.entries(images)) {
    try {
      loadedImages[key] = await loadImage(src);
    } catch (error) {
      console.warn(`Failed to load image: ${src}`, error);
      loadedImages[key] = null;
    }
  }
  return loadedImages;
}


function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

//  لرسم الإيصال على الصورة
const drawReceipt = async (canvas, data) => {
  const ctx = canvas.getContext("2d");

  // إعداد حجم الصورة بناءً على صورة الخلفية
  const backgroundImg = data.images.background;
  canvas.width = backgroundImg.width;
  canvas.height = backgroundImg.height;
  ctx.drawImage(backgroundImg, 0, 0);

  // إعدادات النصوص والصور
  const textConfig = [    
     {
        key: "CONTRACT_NUMBER",
        x: canvas.width - 2390,
        y: 714,
        align: "left",
        fontWeight: "bold",
        fontSize: 60,
      },
      {
        key: "DATE_AR",
        x: canvas.width - 225,
        y: 700,
        align: "right",
        fontSize: 49,
      },
      {
        key: "DATE_Num",
        x: canvas.width - 1235,
        y: 720,
        align: "right",
        fontSize: 49,
      },
      { key: "DATE_EN", x: canvas.width - 225, y: 756, align: "right" },
      {
        key: "REFERENCE_AR",
        x: canvas.width - 228,
        y: 850,
        align: "right",
        fontSize: 49,
      },
      { key: "REFERENCE_EN", x: canvas.width - 228, y: 905, align: "right" },
      {
        key: "REFERENCE_NUM",
        x: canvas.width - 550,
        y: 875,
        align: "right",
        fontSize: 49,
      },
      {
        key: "TENANT_NAME_AR",
        x: canvas.width - 280,
        y: 1015,
        align: "right",
        fontSize: 49,
      },
      { key: "TENANT_NAME_EN", x: canvas.width - 280, y: 1070, align: "right" },
      {
        key: "CAR_DESCRIPTION_AR",
        x: canvas.width - 250,
        y: 1150,
        align: "right",
        fontSize: 49,
      },
      {
        key: "CAR_DESCRIPTION_EN",
        x: canvas.width - 250,
        y: 1205,
        align: "right",
      },
      {
        key: "EMPLOYEE_AR",
        x: canvas.width - 255,
        y: 2940,
        align: "right",
        fontWeight: "bold",
        fontSize: 49,
      },
      {
        key: "EMPLOYEE_EN",
        x: canvas.width - 255,
        y: 2995,
        align: "right",
        fontWeight: "bold",
      },
    ];
  const imageConfig = [
      {
        content: data.images.signature,
        x: canvas.width - 640,
        y: 3000,
        width: 150,
        height: 68,
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
        width: 180,
        height: 168,
      },
    ];
    const textStyle = {
      fontWeight: "normal",
      fontSize: 35,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
    };
    const tableStyle = {
      fontWeight: "normal",
      fontSize: 42,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
      textAlign: "right",
    };
  await document.fonts.load(`${textStyle.fontWeight} ${textStyle.fontSize}px ${textStyle.fontFamily}` ); 
  await document.fonts.load( `${tableStyle.fontWeight} ${tableStyle.fontSize}px ${tableStyle.fontFamily}` );

  // رسم النصوص
  textConfig.forEach(({ key, x, y, align, fontSize, fontWeight }) => {
    const content = data[key] || "";

    const size = fontSize || textStyle.fontSize;
    const weight = fontWeight || textStyle.fontWeight;

    ctx.font = `${weight} ${size}px ${textStyle.fontFamily}`;
    ctx.fillStyle = textStyle.textColor;

    const textWidth = ctx.measureText(content).width;
    let adjustedX = x;
    if (align === "right") adjustedX = x - textWidth;
    else if (align === "center") adjustedX = x - textWidth / 2;

    ctx.fillText(content, adjustedX, y);
  });

  // رسم الصور
  imageConfig.forEach(({ content, x, y, width, height }) => {
    if (content) {
      // تحقق مما إذا كانت الصورة محملة
      ctx.drawImage(content, x, y, width, height);
    } else {
      console.warn("الصورة غير موجودة أو لم يتم تحميلها، يتم تخطيها.");
    }
  });

  // رسم الجدول (عناصر الخدمة)
  const startY = 1410;
  const increment = 117;
  if (data.Serviceitems && data.Serviceitems.length > 0) {
    data.Serviceitems.forEach((item, i) => {
      ctx.fillStyle = tableStyle.textColor;

      // Arabic
      ctx.font = `${"bold"} ${tableStyle.fontSize}px ${
        tableStyle.fontFamily
      }`;
      const arabicTextWidth = ctx.measureText(item.arabic).width;
      let adjustedXArabic = canvas.width - 150 - arabicTextWidth;
      ctx.fillText(item.arabic, adjustedXArabic, startY + i * increment);

      // English
      ctx.font = `35px ${tableStyle.fontFamily}`;
      const englishTextWidth = ctx.measureText(item.english).width;
      let adjustedXEnglish = canvas.width - 150 - englishTextWidth;
      ctx.fillText(item.english, adjustedXEnglish, startY + i * increment + 45);
    });
  }

  //  لرسم العناصر في تنسيق جدول
  const startYForNumbers = 1435;
  const drawItems = (items, xPosition, startY, align) => {
    if (!items || items.length === 0) return;
    items.forEach((item, i) => {
      ctx.font = `${tableStyle.fontWeight} ${tableStyle.fontSize}px ${tableStyle.fontFamily}`;
      ctx.fillStyle = tableStyle.textColor;

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
        else if (align === "center")
          adjustedSumX = xPosition - sumTextWidth / 2;

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
function displayResultInNewWindow(canvas) {
  const dataUrl = canvas.toDataURL("image/png");
  const newWindow = window.open();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الفاتورة الضريبية </title>
        <style>
            body {
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #f0f0f0;
                padding: 5px;
                box-sizing: border-box;
            }
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 100%;
            }
            .image-container {
                position: relative;
                margin-bottom: 20px;
            }
            #pic {
                max-height: calc(100vh - 100px);
                width: auto;
                display: block;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .download-btn {
                background-color: #FF992E;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 20px;
                margin-top: 10px;
                transition: background-color 0.3s;
            }
            .download-btn:hover {
                background-color: #FF992E;
            }
            @media (max-width: 992px) {
                #pic {
                    width: 100% !important;
                    height: auto;
                    max-height: none;
                }
                .download-btn {
                    width: 100%;
                    padding: 15px;
                    font-size: 18px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="image-container">
                <img src="${dataUrl}" alt="Receipt" id="pic"/>
            </div>
            <button class="download-btn" id="downloadBtn">حفظ</button>
        </div>
        <script>
            document.getElementById('downloadBtn').addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = '${dataUrl}';
                link.download = 'receipt-${new Date().toISOString().slice(0, 10)}.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        </script>
    </body>
    </html>
  `;
  
  newWindow.document.open();
  newWindow.document.write(html);
  newWindow.document.close();
}

