(function() {
  async function createAndDisplayReceipt_2() {
  try {
    const canvas = document.createElement("canvas");
    
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
      PAYMENT_METHOD_EN: "Master Card",
      PAYMENT_DESC_AR: "دفعة تحت الحساب لعقد ايجار السيارة لعقد 26-1301-4001105-000303",
      PAYMENT_DESC_EN: "Payment on account for car lease contract for contract 24-1301-4001105-000303",
      NOTES_AR: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ي",
      EMPLOYEE_NAME_AR: "عيسي هاني مبروك عزام",
      EMPLOYEE_NAME_EN: "Issa Hani Mumrok Azzam",
      images: {
        background:"سند صرف/Taiba - Exchange Voucher.png",
        signature: "images/signature_36.png",
        qr: "images/BenanQR.png",
        stamp: "images/Stamp.png",
        Recipient_signature: "images/signature_33.png",
      },
    };

    const loadedImages = await loadDynamicImages(dynamicData.images);
    const dataWithImages = { ...dynamicData, images: loadedImages };
    
    await drawReceipt(canvas, dataWithImages);
    Receipt_Number = "24-1301-4001105-000303"
    displayResultInNewWindow(canvas , Receipt_Number ) ;
    
  } catch (error) {
    console.error("Error generating receipt:", error);
    const errorWindow = window.open();
    errorWindow.document.write(`<h1>Error</h1><p>${error.message}</p>`);
  }
}

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

async function drawReceipt(canvas, data) {
  const ctx = canvas.getContext("2d");

  const backgroundImg = data.images.background;
  if (!backgroundImg) throw new Error("Background image not loaded");
  
  canvas.width = backgroundImg.width;
  canvas.height = 1925; 

  ctx.drawImage(backgroundImg, 0, 0);

  const textConfig = [
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
      { key: "EMPLOYEE_NAME_EN", x: canvas.width - 200, y: 1505, align: "right" },
  ];

  const imageConfig = [
    { content: data.images.signature, x: canvas.width - 580, y: 1502, width: 150, height: 68   },
      { content: data.images.Recipient_signature, x: canvas.width - 1400, y: 1432, width: 171, height: 85 },
      { content: data.images.qr, x: canvas.width - 2398, y: 1430, width: 170, height: 170 },
      { content: data.images.stamp, x: canvas.width - 380, y: 1530, width: 180, height: 168 },
  ];

  const defaultStyle = {
    fontWeight: "normal",
    fontSize: 35,
    fontFamily: "Sakkal Majalla Regular",
    textColor: "#000000",
  };

  await document.fonts.load(`${defaultStyle.fontWeight} ${defaultStyle.fontSize}px ${defaultStyle.fontFamily}`);

  textConfig.forEach(({ key, x, y, align, fontSize, fontWeight }) => {
    const content = data[key] || "";
    const size = fontSize || defaultStyle.fontSize;
    const weight = fontWeight || defaultStyle.fontWeight;

    ctx.font = `${weight} ${size}px ${defaultStyle.fontFamily}`;
    ctx.fillStyle = defaultStyle.textColor;

    const textWidth = ctx.measureText(content).width;
    let adjustedX = x;
    if (align === "right") adjustedX = x - textWidth;
    else if (align === "center") adjustedX = x - textWidth / 2;

    ctx.fillText(content, adjustedX, y);
  });

  imageConfig.forEach(({ content, x, y, width, height }) => {
    if (content) ctx.drawImage(content, x, y, width, height);
  });
}

function displayResultInNewWindow(canvas , Receipt_Number) {
  const dataUrl = canvas.toDataURL("image/png");
  const newWindow = window.open();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>سند صرف</title>
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
            <button class="download-btn" id="downloadBtn"><img src="images/save.svg" class="w-100"/></button>
        </div>
        <script>
            document.getElementById('downloadBtn').addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = '${dataUrl}';
                link.download = '${Receipt_Number}.png';
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

  window.createAndDisplayReceipt_2 = createAndDisplayReceipt_2;
})();