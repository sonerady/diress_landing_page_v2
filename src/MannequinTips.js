import React, { useState, useEffect } from "react";
import "./MannequinTips.css";

function MannequinTips({ lang: propLang }) {
  // Get language from prop or URL parameter, default to "en"
  const lang = propLang || new URLSearchParams(window.location.search).get("lang") || "en";

  // Translations object for all supported languages
  const translations = {
    tr: {
      heroTitle: "Tutarlı ve Doğru Boyutlu Sonuçlar İçin Tavsiyeler",
      heroText:
        "Ürünün boyutu ve yapısı olarak daha tutarlı ve kaliteli sonuçlar için kıyafetlerinizi mümkünse cansız bir manken üzerinde veya kendi üzerinizde (yüzünüzün görünmeyeceği şekilde) fotoğraflamanızı öneririz. Bu zorunlu değil, sadece bir tavsiyedir. Manken kullanımı sonuç kalitesini kesinlikle artırır.",
      beforeAlt: "Örnek manken fotoğrafı",
      resultAlt: "Model giydirme sonucu",
      resultText: "100% Tutarlı Sonuç",
      examplesTitle: "Doğru Fotoğraflama Örnekleri",
      correctShoot: "Doğru Çekim",
      wrongShoot: "Yanlış Çekim",
      example1Good: "Ana ürün tek başına, temiz arka plan",
      example1Bad: "Arka planda başka ürünler var",
      example2Good: "Düz açıdan, iyi ışıklandırma",
      example2Bad: "Çok yan açıdan çekilmiş",
      example3Good: "İyi ışıklandırma ve pozisyon",
      example3Bad: "Karanlık ve gölgeli",
      example4Good: "Doğru konum doğru açı",
      example4Bad: "Ürün yatık/ters konumda",
      whyMannequinTitle: "Neden Cansız Manken?",
      whyMannequin1:
        "Boyut, oran ve formu standartlaştırır; tutarlı sonuç üretir.",
      whyMannequin2:
        "Kırışıklık, gölge ve parlamayı kontrol etmeyi kolaylaştırır.",
      whyMannequin3:
        "Ürünün silüeti netleşir; yapay zekâ için daha anlaşılır olur.",
      shootingTipsTitle: "Çekim Önerileri",
      shootingTip1:
        "Düz ve sade bir arka plan kullanın, ışığı dengeli yayılacak şekilde ayarlayın.",
      shootingTip2:
        "Ürünü manken üzerinde düzgünce konumlandırın, potluk ve kırışıklıkları azaltın.",
      shootingTip3: "Kareyi ürüne yakın kırpın; gereksiz boşlukları azaltın.",
      dosTitle: "Yapılması Gerekenler",
      dos1: "Ürünün üstünde herhangi bir fiyat etiketi, beden etiketi veya aksesuar bulunmasın.",
      dontsTitle: "Yapılmaması Gerekenler",
      donts1: "Aşırı filtre, vignette veya renk manipülasyonlarından kaçının.",
      donts2: "Yüksek ayna yansımaları veya parlamalara izin vermeyin.",
      donts3: "Arka planda dikkat dağıtan objeler bulundurmayın.",
    },
    en: {
      heroTitle: "Tips for Consistent and Accurate Results",
      heroText:
        "For more consistent and quality results in terms of product size and structure, we recommend photographing your clothes on a mannequin or on yourself (without showing your face) whenever possible. This is not mandatory, just a recommendation. Using a mannequin definitely improves result quality.",
      beforeAlt: "Example mannequin photo",
      resultAlt: "Model dressing result",
      resultText: "100% Consistent Result",
      examplesTitle: "Correct Photography Examples",
      correctShoot: "Correct Shot",
      wrongShoot: "Wrong Shot",
      example1Good: "Main product alone, clean background",
      example1Bad: "Other products in the background",
      example2Good: "Straight angle, good lighting",
      example2Bad: "Shot from too much of a side angle",
      example3Good: "Good lighting and positioning",
      example3Bad: "Dark and shadowy",
      example4Good: "Correct position, correct angle",
      example4Bad: "Product tilted/upside down",
      whyMannequinTitle: "Why Use a Mannequin?",
      whyMannequin1:
        "Standardizes size, proportion and form; produces consistent results.",
      whyMannequin2:
        "Makes it easier to control wrinkles, shadows and reflections.",
      whyMannequin3:
        "Product silhouette becomes clearer; more understandable for AI.",
      shootingTipsTitle: "Shooting Tips",
      shootingTip1:
        "Use a plain and simple background, adjust lighting to spread evenly.",
      shootingTip2:
        "Position the product neatly on the mannequin, reduce bunching and wrinkles.",
      shootingTip3:
        "Crop the frame close to the product; reduce unnecessary spaces.",
      dosTitle: "Things to Do",
      dos1: "Make sure there are no price tags, size labels or accessories on the product.",
      dontsTitle: "Things Not to Do",
      donts1: "Avoid excessive filters, vignetting or color manipulations.",
      donts2: "Don't allow high mirror reflections or glare.",
      donts3: "Don't include distracting objects in the background.",
    },
    de: {
      heroTitle: "Tipps für konsistente und genaue Ergebnisse",
      heroText:
        "Für konsistentere und qualitativ hochwertigere Ergebnisse in Bezug auf Produktgröße und -struktur empfehlen wir, Ihre Kleidung nach Möglichkeit auf einer Schaufensterpuppe oder an sich selbst (ohne Ihr Gesicht zu zeigen) zu fotografieren. Dies ist nicht zwingend erforderlich, nur eine Empfehlung. Die Verwendung einer Schaufensterpuppe verbessert definitiv die Ergebnisqualität.",
      beforeAlt: "Beispiel Schaufensterpuppen-Foto",
      resultAlt: "Modell-Anzieh-Ergebnis",
      resultText: "100% konsistentes Ergebnis",
      examplesTitle: "Korrekte Fotografie-Beispiele",
      correctShoot: "Korrekter Schuss",
      wrongShoot: "Falscher Schuss",
      example1Good: "Hauptprodukt allein, sauberer Hintergrund",
      example1Bad: "Andere Produkte im Hintergrund",
      example2Good: "Gerader Winkel, gute Beleuchtung",
      example2Bad: "Zu sehr von der Seite aufgenommen",
      example3Good: "Gute Beleuchtung und Positionierung",
      example3Bad: "Dunkel und schattig",
      example4Good: "Korrekte Position, korrekter Winkel",
      example4Bad: "Produkt geneigt/verkehrt herum",
      whyMannequinTitle: "Warum eine Schaufensterpuppe verwenden?",
      whyMannequin1:
        "Standardisiert Größe, Proportion und Form; produziert konsistente Ergebnisse.",
      whyMannequin2:
        "Macht es einfacher, Falten, Schatten und Reflexionen zu kontrollieren.",
      whyMannequin3: "Produktsilhouette wird klarer; verständlicher für KI.",
      shootingTipsTitle: "Aufnahme-Tipps",
      shootingTip1:
        "Verwenden Sie einen schlichten und einfachen Hintergrund, stellen Sie die Beleuchtung gleichmäßig ein.",
      shootingTip2:
        "Positionieren Sie das Produkt ordentlich auf der Schaufensterpuppe, reduzieren Sie Bündelung und Falten.",
      shootingTip3:
        "Beschneiden Sie den Rahmen nah am Produkt; reduzieren Sie unnötige Räume.",
      dosTitle: "Was zu tun ist",
      dos1: "Stellen Sie sicher, dass keine Preisschilder, Größenetiketten oder Accessoires am Produkt sind.",
      dontsTitle: "Was nicht zu tun ist",
      donts1:
        "Vermeiden Sie übermäßige Filter, Vignettierung oder Farbmanipulationen.",
      donts2: "Lassen Sie keine hohen Spiegelreflexionen oder Blendungen zu.",
      donts3: "Fügen Sie keine ablenkenden Objekte in den Hintergrund ein.",
    },
    es: {
      heroTitle: "Consejos para resultados consistentes y precisos",
      heroText:
        "Para obtener resultados más consistentes y de calidad en términos de tamaño y estructura del producto, recomendamos fotografiar su ropa en un maniquí o en usted mismo (sin mostrar su rostro) siempre que sea posible. Esto no es obligatorio, solo una recomendación. Usar un maniquí definitivamente mejora la calidad del resultado.",
      beforeAlt: "Foto de maniquí de ejemplo",
      resultAlt: "Resultado de vestir modelo",
      resultText: "100% Resultado Consistente",
      examplesTitle: "Ejemplos de Fotografía Correcta",
      correctShoot: "Toma Correcta",
      wrongShoot: "Toma Incorrecta",
      example1Good: "Producto principal solo, fondo limpio",
      example1Bad: "Otros productos en el fondo",
      example2Good: "Ángulo recto, buena iluminación",
      example2Bad: "Tomado desde demasiado ángulo lateral",
      example3Good: "Buena iluminación y posicionamiento",
      example3Bad: "Oscuro y con sombras",
      example4Good: "Posición correcta, ángulo correcto",
      example4Bad: "Producto inclinado/al revés",
      whyMannequinTitle: "¿Por qué usar un maniquí?",
      whyMannequin1:
        "Estandariza tamaño, proporción y forma; produce resultados consistentes.",
      whyMannequin2: "Facilita el control de arrugas, sombras y reflejos.",
      whyMannequin3:
        "La silueta del producto se vuelve más clara; más comprensible para IA.",
      shootingTipsTitle: "Consejos de Fotografía",
      shootingTip1:
        "Use un fondo plano y simple, ajuste la iluminación para que se extienda uniformemente.",
      shootingTip2:
        "Posicione el producto ordenadamente en el maniquí, reduzca arrugas y pliegues.",
      shootingTip3:
        "Recorte el marco cerca del producto; reduzca espacios innecesarios.",
      dosTitle: "Qué hacer",
      dos1: "Asegúrese de que no haya etiquetas de precio, etiquetas de talla o accesorios en el producto.",
      dontsTitle: "Qué no hacer",
      donts1: "Evite filtros excesivos, viñeteado o manipulaciones de color.",
      donts2: "No permita reflejos de espejo altos o deslumbramiento.",
      donts3: "No incluya objetos que distraigan en el fondo.",
    },
    fr: {
      heroTitle: "Conseils pour des résultats cohérents et précis",
      heroText:
        "Pour des résultats plus cohérents et de qualité en termes de taille et de structure du produit, nous recommandons de photographier vos vêtements sur un mannequin ou sur vous-même (sans montrer votre visage) dans la mesure du possible. Ce n'est pas obligatoire, juste une recommandation. L'utilisation d'un mannequin améliore définitivement la qualité du résultat.",
      beforeAlt: "Photo de mannequin d'exemple",
      resultAlt: "Résultat d'habillage de modèle",
      resultText: "100% Résultat Cohérent",
      examplesTitle: "Exemples de Photographie Correcte",
      correctShoot: "Prise Correcte",
      wrongShoot: "Prise Incorrecte",
      example1Good: "Produit principal seul, arrière-plan propre",
      example1Bad: "Autres produits en arrière-plan",
      example2Good: "Angle droit, bon éclairage",
      example2Bad: "Pris sous un angle trop latéral",
      example3Good: "Bon éclairage et positionnement",
      example3Bad: "Sombre et ombragé",
      example4Good: "Position correcte, angle correct",
      example4Bad: "Produit incliné/à l'envers",
      whyMannequinTitle: "Pourquoi utiliser un mannequin ?",
      whyMannequin1:
        "Standardise la taille, la proportion et la forme ; produit des résultats cohérents.",
      whyMannequin2:
        "Facilite le contrôle des plis, des ombres et des reflets.",
      whyMannequin3:
        "La silhouette du produit devient plus claire ; plus compréhensible pour l'IA.",
      shootingTipsTitle: "Conseils de Prise de Vue",
      shootingTip1:
        "Utilisez un arrière-plan uni et simple, ajustez l'éclairage pour qu'il se répande uniformément.",
      shootingTip2:
        "Positionnez le produit proprement sur le mannequin, réduisez les plis et les froissements.",
      shootingTip3:
        "Recadrez le cadre près du produit ; réduisez les espaces inutiles.",
      dosTitle: "Choses à faire",
      dos1: "Assurez-vous qu'il n'y a pas d'étiquettes de prix, d'étiquettes de taille ou d'accessoires sur le produit.",
      dontsTitle: "Choses à ne pas faire",
      donts1:
        "Évitez les filtres excessifs, le vignettage ou les manipulations de couleur.",
      donts2:
        "Ne permettez pas de reflets de miroir élevés ou d'éblouissement.",
      donts3: "N'incluez pas d'objets distrayants en arrière-plan.",
    },
    it: {
      heroTitle: "Consigli per risultati coerenti e precisi",
      heroText:
        "Per risultati più coerenti e di qualità in termini di dimensioni e struttura del prodotto, raccomandiamo di fotografare i vostri vestiti su un manichino o su voi stessi (senza mostrare il viso) quando possibile. Questo non è obbligatorio, solo una raccomandazione. L'uso di un manichino migliora definitivamente la qualità del risultato.",
      beforeAlt: "Foto di manichino di esempio",
      resultAlt: "Risultato di vestizione del modello",
      resultText: "100% Risultato Coerente",
      examplesTitle: "Esempi di Fotografia Corretta",
      correctShoot: "Scatto Corretto",
      wrongShoot: "Scatto Sbagliato",
      example1Good: "Prodotto principale da solo, sfondo pulito",
      example1Bad: "Altri prodotti sullo sfondo",
      example2Good: "Angolo retto, buona illuminazione",
      example2Bad: "Scattato da troppo angolo laterale",
      example3Good: "Buona illuminazione e posizionamento",
      example3Bad: "Scuro e ombroso",
      example4Good: "Posizione corretta, angolo corretto",
      example4Bad: "Prodotto inclinato/capovolto",
      whyMannequinTitle: "Perché usare un manichino?",
      whyMannequin1:
        "Standardizza dimensioni, proporzioni e forma; produce risultati coerenti.",
      whyMannequin2: "Facilita il controllo di pieghe, ombre e riflessi.",
      whyMannequin3:
        "La silhouette del prodotto diventa più chiara; più comprensibile per l'IA.",
      shootingTipsTitle: "Consigli di Ripresa",
      shootingTip1:
        "Usa uno sfondo semplice e piano, regola l'illuminazione per distribuirla uniformemente.",
      shootingTip2:
        "Posiziona il prodotto ordinatamente sul manichino, riduci pieghe e grinze.",
      shootingTip3:
        "Ritaglia il frame vicino al prodotto; riduci spazi inutili.",
      dosTitle: "Cosa fare",
      dos1: "Assicurati che non ci siano etichette di prezzo, etichette di taglia o accessori sul prodotto.",
      dontsTitle: "Cosa non fare",
      donts1:
        "Evita filtri eccessivi, vignettatura o manipolazioni del colore.",
      donts2: "Non permettere riflessi di specchio alti o abbagliamento.",
      donts3: "Non includere oggetti che distraggono sullo sfondo.",
    },
    ja: {
      heroTitle: "一貫性のある正確な結果のためのヒント",
      heroText:
        "製品のサイズと構造に関して、より一貫性があり質の高い結果を得るために、可能な限りマネキンまたはご自身（顔を見せずに）で衣服を撮影することをお勧めします。これは必須ではなく、単なる推奨事項です。マネキンの使用は確実に結果の品質を向上させます。",
      beforeAlt: "サンプルマネキン写真",
      resultAlt: "モデル着用結果",
      resultText: "100%一貫した結果",
      examplesTitle: "正しい撮影例",
      correctShoot: "正しい撮影",
      wrongShoot: "間違った撮影",
      example1Good: "メイン製品のみ、クリーンな背景",
      example1Bad: "背景に他の製品がある",
      example2Good: "ストレートアングル、良い照明",
      example2Bad: "横からの角度すぎる撮影",
      example3Good: "良い照明と位置づけ",
      example3Bad: "暗くて影がある",
      example4Good: "正しい位置、正しい角度",
      example4Bad: "製品が傾いている/逆さま",
      whyMannequinTitle: "なぜマネキンを使うのか？",
      whyMannequin1: "サイズ、比率、形を標準化し、一貫した結果を生み出します。",
      whyMannequin2: "しわ、影、反射をコントロールしやすくします。",
      whyMannequin3:
        "製品のシルエットがより明確になり、AIにとってより理解しやすくなります。",
      shootingTipsTitle: "撮影のコツ",
      shootingTip1:
        "シンプルで平坦な背景を使用し、照明を均等に広がるように調整してください。",
      shootingTip2:
        "マネキンに製品をきちんと配置し、たるみやしわを減らしてください。",
      shootingTip3:
        "フレームを製品に近くトリミングし、不要なスペースを減らしてください。",
      dosTitle: "すべきこと",
      dos1: "製品に価格タグ、サイズラベル、アクセサリーがないことを確認してください。",
      dontsTitle: "してはいけないこと",
      donts1: "過度なフィルター、ビネット、色の操作を避けてください。",
      donts2: "高い鏡の反射やまぶしさを許可しないでください。",
      donts3: "背景に気を散らす物体を含めないでください。",
    },
    ko: {
      heroTitle: "일관되고 정확한 결과를 위한 팁",
      heroText:
        "제품 크기와 구조 측면에서 더 일관되고 고품질의 결과를 얻기 위해 가능한 한 마네킹이나 본인(얼굴을 보이지 않게)에 옷을 입고 촬영하는 것을 권장합니다. 이는 필수가 아니라 단순한 권장사항입니다. 마네킹 사용은 확실히 결과 품질을 향상시킵니다.",
      beforeAlt: "예시 마네킹 사진",
      resultAlt: "모델 착용 결과",
      resultText: "100% 일관된 결과",
      examplesTitle: "올바른 촬영 예시",
      correctShoot: "올바른 촬영",
      wrongShoot: "잘못된 촬영",
      example1Good: "메인 제품만, 깨끗한 배경",
      example1Bad: "배경에 다른 제품들",
      example2Good: "직선 각도, 좋은 조명",
      example2Bad: "너무 측면 각도에서 촬영",
      example3Good: "좋은 조명과 위치",
      example3Bad: "어둡고 그림자가 있음",
      example4Good: "올바른 위치, 올바른 각도",
      example4Bad: "제품이 기울어짐/거꾸로",
      whyMannequinTitle: "왜 마네킹을 사용하나요?",
      whyMannequin1: "크기, 비율, 형태를 표준화하여 일관된 결과를 생성합니다.",
      whyMannequin2: "주름, 그림자, 반사를 제어하기 쉽게 만듭니다.",
      whyMannequin3: "제품 실루엣이 더 명확해져 AI가 더 이해하기 쉬워집니다.",
      shootingTipsTitle: "촬영 팁",
      shootingTip1:
        "단순하고 평평한 배경을 사용하고, 조명을 고르게 퍼지도록 조정하세요.",
      shootingTip2:
        "마네킹에 제품을 깔끔하게 배치하고, 구김과 주름을 줄이세요.",
      shootingTip3: "제품에 가깝게 프레임을 자르고, 불필요한 공간을 줄이세요.",
      dosTitle: "해야 할 것들",
      dos1: "제품에 가격표, 사이즈 라벨, 액세서리가 없는지 확인하세요.",
      dontsTitle: "하지 말아야 할 것들",
      donts1: "과도한 필터, 비네팅, 색상 조작을 피하세요.",
      donts2: "높은 거울 반사나 눈부심을 허용하지 마세요.",
      donts3: "배경에 주의를 분산시키는 물체를 포함하지 마세요.",
    },
    pt: {
      heroTitle: "Dicas para resultados consistentes e precisos",
      heroText:
        "Para resultados mais consistentes e de qualidade em termos de tamanho e estrutura do produto, recomendamos fotografar suas roupas em um manequim ou em você mesmo (sem mostrar o rosto) sempre que possível. Isso não é obrigatório, apenas uma recomendação. Usar um manequim definitivamente melhora a qualidade do resultado.",
      beforeAlt: "Foto de manequim de exemplo",
      resultAlt: "Resultado de vestir modelo",
      resultText: "100% Resultado Consistente",
      examplesTitle: "Exemplos de Fotografia Correta",
      correctShoot: "Foto Correta",
      wrongShoot: "Foto Incorreta",
      example1Good: "Produto principal sozinho, fundo limpo",
      example1Bad: "Outros produtos no fundo",
      example2Good: "Ângulo reto, boa iluminação",
      example2Bad: "Fotografado de ângulo lateral demais",
      example3Good: "Boa iluminação e posicionamento",
      example3Bad: "Escuro e com sombras",
      example4Good: "Posição correta, ângulo correto",
      example4Bad: "Produto inclinado/de cabeça para baixo",
      whyMannequinTitle: "Por que usar um manequim?",
      whyMannequin1:
        "Padroniza tamanho, proporção e forma; produz resultados consistentes.",
      whyMannequin2: "Facilita o controle de rugas, sombras e reflexos.",
      whyMannequin3:
        "A silhueta do produto fica mais clara; mais compreensível para IA.",
      shootingTipsTitle: "Dicas de Fotografia",
      shootingTip1:
        "Use um fundo simples e plano, ajuste a iluminação para se espalhar uniformemente.",
      shootingTip2:
        "Posicione o produto ordenadamente no manequim, reduza franzidos e rugas.",
      shootingTip3:
        "Corte o quadro próximo ao produto; reduza espaços desnecessários.",
      dosTitle: "O que fazer",
      dos1: "Certifique-se de que não há etiquetas de preço, etiquetas de tamanho ou acessórios no produto.",
      dontsTitle: "O que não fazer",
      donts1: "Evite filtros excessivos, vinhetas ou manipulações de cor.",
      donts2: "Não permita reflexos de espelho altos ou brilho.",
      donts3: "Não inclua objetos que distraem no fundo.",
    },
    ru: {
      heroTitle: "Советы для последовательных и точных результатов",
      heroText:
        "Для более последовательных и качественных результатов с точки зрения размера и структуры продукта мы рекомендуем фотографировать вашу одежду на манекене или на себе (не показывая лицо) по возможности. Это не обязательно, просто рекомендация. Использование манекена определенно улучшает качество результата.",
      beforeAlt: "Пример фото манекена",
      resultAlt: "Результат одевания модели",
      resultText: "100% Последовательный Результат",
      examplesTitle: "Примеры правильной фотографии",
      correctShoot: "Правильный снимок",
      wrongShoot: "Неправильный снимок",
      example1Good: "Основной продукт отдельно, чистый фон",
      example1Bad: "Другие продукты на фоне",
      example2Good: "Прямой угол, хорошее освещение",
      example2Bad: "Снято слишком под боковым углом",
      example3Good: "Хорошее освещение и позиционирование",
      example3Bad: "Темно и с тенями",
      example4Good: "Правильная позиция, правильный угол",
      example4Bad: "Продукт наклонен/перевернут",
      whyMannequinTitle: "Зачем использовать манекен?",
      whyMannequin1:
        "Стандартизирует размер, пропорции и форму; производит последовательные результаты.",
      whyMannequin2: "Облегчает контроль складок, теней и отражений.",
      whyMannequin3: "Силуэт продукта становится четче; более понятен для ИИ.",
      shootingTipsTitle: "Советы по съемке",
      shootingTip1:
        "Используйте простой и ровный фон, настройте освещение для равномерного распространения.",
      shootingTip2:
        "Расположите продукт аккуратно на манекене, уменьшите складки и морщины.",
      shootingTip3:
        "Обрежьте кадр близко к продукту; уменьшите ненужные пространства.",
      dosTitle: "Что делать",
      dos1: "Убедитесь, что на продукте нет ценников, размерных этикеток или аксессуаров.",
      dontsTitle: "Что не делать",
      donts1:
        "Избегайте чрезмерных фильтров, виньетирования или цветовых манипуляций.",
      donts2: "Не допускайте высоких зеркальных отражений или бликов.",
      donts3: "Не включайте отвлекающие объекты на фоне.",
    },
    zh: {
      heroTitle: "获得一致准确结果的提示",
      heroText:
        "为了在产品尺寸和结构方面获得更一致和高质量的结果，我们建议尽可能在人体模特上或在您自己身上（不露脸）拍摄您的服装。这不是强制性的，只是一个建议。使用人体模特绝对会提高结果质量。",
      beforeAlt: "示例人体模特照片",
      resultAlt: "模特穿着结果",
      resultText: "100% 一致结果",
      examplesTitle: "正确摄影示例",
      correctShoot: "正确拍摄",
      wrongShoot: "错误拍摄",
      example1Good: "主要产品单独，干净背景",
      example1Bad: "背景中有其他产品",
      example2Good: "直角，良好照明",
      example2Bad: "侧角度拍摄过多",
      example3Good: "良好照明和定位",
      example3Bad: "黑暗和阴影",
      example4Good: "正确位置，正确角度",
      example4Bad: "产品倾斜/颠倒",
      whyMannequinTitle: "为什么使用人体模特？",
      whyMannequin1: "标准化尺寸、比例和形状；产生一致的结果。",
      whyMannequin2: "更容易控制皱纹、阴影和反射。",
      whyMannequin3: "产品轮廓变得更清晰；对AI更易理解。",
      shootingTipsTitle: "拍摄技巧",
      shootingTip1: "使用简单平坦的背景，调整照明使其均匀分布。",
      shootingTip2: "将产品整齐地放置在人体模特上，减少褶皱和皱纹。",
      shootingTip3: "将框架裁剪到产品附近；减少不必要的空间。",
      dosTitle: "应该做的事",
      dos1: "确保产品上没有价格标签、尺寸标签或配件。",
      dontsTitle: "不应该做的事",
      donts1: "避免过度滤镜、暗角或颜色操作。",
      donts2: "不要允许高镜面反射或眩光。",
      donts3: "不要在背景中包含分散注意力的物体。",
    },
  };

  // Get current language translations, fallback to English if not found
  const t = translations[lang] || translations.en;
  const beforeSrc = "/assets/mannequins/before.JPG";
  const resultImages = [
    "/assets/mannequins/man_result_0.PNG",
    "/assets/mannequins/man_result_1.PNG",
    "/assets/mannequins/man_result_2.PNG",
    "/assets/mannequins/man_result_3.PNG",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resultImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [resultImages.length]);

  // Auto scroll animation on page load (only once)
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, user-scalable=yes"
      );
    }

    // Check if auto scroll has already been done
    const hasAutoScrolled = sessionStorage.getItem("hasAutoScrolled");

    if (!hasAutoScrolled) {
      const autoScroll = () => {
        // Wait a bit for page to load
        setTimeout(() => {
          // Scroll to bottom quickly
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });

          // Then scroll back to top after 1.5 seconds
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 1500);
        }, 800);
      };

      autoScroll();
      // Mark that auto scroll has been done
      sessionStorage.setItem("hasAutoScrolled", "true");
    }
  }, []);

  return (
    <div className="mannequin-tips">
      <div className="tips-hero">
        <div className="hero-content">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
        </div>
        <div className="hero-check">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#16a34a" />
            <path
              d="M8 12.5l2.5 2.5L16 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <section className="tips-gallery">
        <div className="simple-slider-container">
          {/* Before image preview - top right */}
          <div className="before-preview">
            <div className="before-mini">
              <img src={beforeSrc} alt={t.beforeAlt} />
            </div>
          </div>

          {/* Simple Image Slider */}
          <div className="simple-slider">
            <div className="slider-image-container">
              <img
                src={resultImages[currentIndex]}
                alt={`${t.resultAlt} ${currentIndex + 1}`}
                className="slider-image"
                draggable={false}
              />
              <div className="result-overlay">
                <span className="result-text">{t.resultText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="photo-examples">
        <h2 className="examples-title">{t.examplesTitle}</h2>

        <div className="examples-container">
          <div className="examples-header">
            <h3 className="do-title">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#22c55e" />
                <path
                  d="M8 12.5l2.5 2.5L16 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.correctShoot}
            </h3>
            <h3 className="dont-title">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#ef4444" />
                <path
                  d="M8 8l8 8M16 8l-8 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {t.wrongShoot}
            </h3>
          </div>

          <div className="examples-grid">
            <div className="example-card good">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_1_incorrect.png"
                  alt={t.correctShoot + " 1"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example1Good}</p>
            </div>
            <div className="example-card bad">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_1_correct.png"
                  alt={t.wrongShoot + " 1"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example1Bad}</p>
            </div>

            <div className="example-card good">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_2_incorrect.png"
                  alt={t.correctShoot + " 2"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example2Good}</p>
            </div>
            <div className="example-card bad">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_2_correct.png"
                  alt={t.wrongShoot + " 2"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example2Bad}</p>
            </div>

            <div className="example-card good">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_3_incorrect.png"
                  alt={t.correctShoot + " 3"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example3Good}</p>
            </div>
            <div className="example-card bad">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_3_correct.png"
                  alt={t.wrongShoot + " 3"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example3Bad}</p>
            </div>

            <div className="example-card good">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_4_incorrect.png"
                  alt={t.correctShoot + " 4"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example4Good}</p>
            </div>
            <div className="example-card bad">
              <div className="example-image">
                <img
                  src="/assets/mannequins/image_4_correct.png"
                  alt={t.wrongShoot + " 4"}
                  className="example-img"
                />
              </div>
              <p className="example-text">{t.example4Bad}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tips-sections">
        <div className="tip-box">
          <h2>{t.whyMannequinTitle}</h2>
          <ul>
            <li>{t.whyMannequin1}</li>
            <li>{t.whyMannequin2}</li>
            <li>{t.whyMannequin3}</li>
          </ul>
        </div>

        <div className="tip-box">
          <h2>{t.shootingTipsTitle}</h2>
          <ul>
            <li>{t.shootingTip1}</li>
            <li>{t.shootingTip2}</li>
            <li>{t.shootingTip3}</li>
          </ul>
        </div>

        <div className="tip-box">
          <h2 className="do-title">{t.dosTitle}</h2>
          <ul>
            <li>{t.dos1}</li>
          </ul>
        </div>

        <div className="tip-box">
          <h2 className="dont-title">{t.dontsTitle}</h2>
          <ul>
            <li>{t.donts1}</li>
            <li>{t.donts2}</li>
            <li>{t.donts3}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default MannequinTips;
