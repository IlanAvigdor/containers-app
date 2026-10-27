import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Maximize, 
  Minimize, 
  Flame, 
  ShieldAlert, 
  Target, 
  Crosshair, 
  Zap, 
  Radio, 
  FileText, 
  CheckCircle2, 
  Wrench,
  Truck,
  Cpu,
  Cog,
  BatteryCharging,
  Play,
  Pause,
  Upload,
  Video,
  Edit3,
  Check,
  Package,
  Layers,
  ImagePlus,
  Trash2,
  RotateCw,
  Camera
} from 'lucide-react';
import './Presentation.css';

// Exact 6 slides requested by user
export const initialSlidesData = [
  {
    id: 1,
    type: 'title',
    tag: 'מחלקת טנ"א // 402',
    category: 'חיל הטכנולוגיה והאחזקה // גדוד רשף',
    title: 'מחלקת טנ"א 402',
    subtitle: 'מערך הטכנולוגיה, האחזקה והחימוש • גדוד רשף (402) • עוצבת עמוד האש',
    date: 'אוקטובר 2026',
    unit: 'גדוד 402 רשף',
    footerNote: 'רשף - גאה להיות שייך // חיל הטכנולוגיה והאחזקה'
  },
  {
    id: 2,
    type: 'video',
    tag: 'שקופית 02',
    category: 'מדיה ומורשת',
    title: 'סרטון גדודי',
    subtitle: 'עוצמה באש ובאחזקה • פעילות מבצעית ומורשת קרב גדוד 402',
    footerNote: 'גדוד 402 רשף // סרטון תדמית ומורשת'
  },
  {
    id: 3,
    type: 'content',
    tag: 'שקופית 03 // מקצועות טנ"א',
    category: 'מערך החימוש והאש',
    title: 'טכנאי נשק',
    subtitle: 'אחריות על כשירות, כיול ואחזקת אמצעי הלחימה והירי בגדוד',
    bullets: [
      {
        icon: Crosshair,
        title: 'אחזקת נשק קל ומקלעים',
        text: 'טיפול שוטף, ביקורות תקופתיות ותיקון תקלות בנשקי הצוות והמקלעים הכבדים (מאג, 0.5).'
      },
      {
        icon: ShieldAlert,
        title: 'בטיחות ואיפוס מבצעי',
        text: 'הקפדה מחמירה על בטיחות כלי הירייה, בדיקות מכלולים ואיפוסים טקטיים בשטח.'
      }
    ],
    footerNote: 'טכנאי נשק // עוצמת האש של גדוד רשף'
  },
  {
    id: 4,
    type: 'content',
    tag: 'שקופית 04 // מקצועות טנ"א',
    category: 'רכב ומערכות מתקדמות',
    title: 'טכנאי אוטוטק',
    subtitle: 'אבחון ממוחשב, בקרה מתקדמת ואחזקת רכבי שטח וסיוע מבצעיים',
    bullets: [
      {
        icon: Truck,
        title: 'כשירות צי הרכב הגדודי',
        text: 'טיפול ברכבי פיקוד, משאיות אספקה, רכבי תחמושת ורכבי חילוץ שטח.'
      },
      {
        icon: Wrench,
        title: 'מענה תחת עומס שטח',
        text: 'זיהוי מהיר של כשלים מכניים ומערכתיים והחזרת כלים לכשירות במינימום זמן.'
      }
    ],
    footerNote: 'טכנאי אוטוטק // רציפות תנועה בגזרה'
  },
  {
    id: 5,
    type: 'content',
    tag: 'שקופית 05 // מקצועות טנ"א',
    category: 'חטיבות כוח ותמרון',
    title: 'טכנאי מערכות הנעה',
    subtitle: 'מומחיות בחטיבות כוח, מנועי דיזל כבדים ומערכות הינע זחליות',
    bullets: [
      {
        icon: Cog,
        title: 'מנועים וחטיבות כוח תומ"ת',
        text: 'במסגרת תפקידך תהיה אמון על תפעול, אחזקה וכשירות מערכות הנעה בתומ"ת ומוכנותן לפעולה.'
      },
      {
        icon: Wrench,
        title: 'תמסורת, גירים ומערכות הידראוליקה',
        text: 'שמירה על לחצי עבודה תקינים, תיבות הילוכים אוטומטיות וממסרות כבדות.'
      },
      {
        icon: Flame,
        title: 'מערכות זחל ומתלים',
        text: 'טיפול בזחלים, גלגלי מרכוב, מתלי פיתול ועבירות בתנאי שטח קיצוניים.'
      }
    ],
    footerNote: 'מערכות הנעה // כוח ועבירות ללא פשרות'
  },
  {
    id: 6,
    type: 'content',
    tag: 'שקופית 06 // מקצועות טנ"א',
    category: 'חשמל, בקרה ואלקטרוניקה',
    title: 'טכנאי מערכות חשמל',
    subtitle: 'רשת החשמל, האנרגיה, המצברים והמערכות האלקטרו-מכניות בכלים',
    bullets: [
      {
        icon: BatteryCharging,
        title: 'מערכות טעינה, אנרגיה ומצברים',
        text: 'ניהול רשת החשמל של התומ"ת, אלטרנטורים רבי-עוצמה ומארזי מצברי התנעה.'
      },
      {
        icon: Zap,
        title: 'חשמל תותח ומערכות צידוד/עלרוד',
        text: 'תפקיד טכנאי מערכות חשמל תומ"ת הוא לבצע פעולות אחזקה מונעת ואחזקת שבר במערכות אלקטרוניות בתומ"ת.'
      }
    ],
    footerNote: 'מערכות חשמל // אנרגיה ובקרה מדויקת'
  },
  {
    id: 7,
    type: 'gallery',
    tag: 'שקופית 07 // גלריה מבצעית',
    category: 'תיעוד ופעילות שטח',
    title: 'גלריה מבצעית - מחלקת טנ"א 402',
    subtitle: 'תיעוד פעילות הצוותים, כשירות הכלים ואימוני אש בשטח',
    footerNote: 'מחלקת טנ"א 402 // עוצמה, מקצועיות ורעות'
  }
];

export default function Presentation({ onSwitchToInventory }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState(initialSlidesData);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Video state for Slide 2
  const [videoSrc, setVideoSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Gallery state for Slide 7 (3 images)
  const [galleryImages, setGalleryImages] = useState(() => {
    try {
      const saved = localStorage.getItem('reshef_slide7_images');
      return saved ? JSON.parse(saved) : [null, null, null];
    } catch {
      return [null, null, null];
    }
  });

  const handleImageUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...galleryImages];
      updated[index] = e.target.result;
      setGalleryImages(updated);
      try {
        localStorage.setItem('reshef_slide7_images', JSON.stringify(updated));
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    const updated = [...galleryImages];
    updated[index] = null;
    setGalleryImages(updated);
    try {
      localStorage.setItem('reshef_slide7_images', JSON.stringify(updated));
    } catch {}
  };

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex];

  // Navigation handlers
  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid triggering when editing text
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Video handlers
  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="combat-presentation-root">
      {/* Background layer with artillery photo, fiery red gradients & tactical grid */}
      <div className="combat-bg-layer">
        <img 
          src="./artillery_bg.png" 
          alt="Artillery Firing Background" 
          className="combat-bg-image" 
        />
        <div className="combat-bg-overlay" />
        <div className="combat-grid-overlay" />
        <div className="combat-vignette" />
      </div>

      {/* Header bar */}
      <header className="combat-header">
        <div className="combat-brand">
          <div className="combat-logo-wrapper">
            <img 
              src="./battalion_logo.png" 
              alt="סמל גדוד רשף" 
              className="combat-logo-img" 
            />
          </div>
          <div className="combat-title-group">
            <h1>
              <Flame size={20} color="#ff3b3b" />
              מחלקת טנ"א 402 • גדוד רשף
            </h1>
            <div className="motto">רשף - גאה להיות שייך</div>
          </div>
        </div>

        <div className="combat-header-actions">
          <div className="combat-tactical-pill">
            <span className="pulse-dot" />
            <span>TANA // 402 RESHEF</span>
          </div>

          <button 
            className="btn-tactical" 
            onClick={toggleFullscreen}
            title="מסך מלא"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            <span>{isFullscreen ? 'צא ממסך מלא' : 'מסך מלא'}</span>
          </button>

          {onSwitchToInventory && (
            <button 
              className="btn-tactical" 
              onClick={onSwitchToInventory}
              title="מעבר למערכת המלאי של ליעד"
            >
              <Package size={16} />
              <span>מלאי ליעד</span>
            </button>
          )}
        </div>
      </header>

      {/* Presentation Stage */}
      <main className="combat-presentation-stage">
        <div className="combat-slide-wrapper">
          {/* Navigation Arrow Previous (In RTL: on right side) */}
          <button 
            className="nav-arrow-btn nav-arrow-prev"
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            title="שקופית קודמת (מקש חץ ימינה)"
            aria-label="Previous Slide"
          >
            <ChevronRight size={32} />
          </button>

          {/* Active Slide Card */}
          <div className="combat-slide-card" key={currentSlide.id}>
            {/* Artillery Firing Background Image for Every Slide */}
            <div className="slide-card-bg-layer">
              <img 
                src="./artillery_bg.png" 
                alt="תותח יורה ברקע השקופית" 
                className="slide-card-bg-img" 
              />
              <div className="slide-card-bg-overlay" />
            </div>

            {/* Tactical Corners */}
            <div className="combat-corner top-right" />
            <div className="combat-corner top-left" />
            <div className="combat-corner bottom-right" />
            <div className="combat-corner bottom-left" />

            {/* Top Slide Meta */}
            <div className="slide-top-meta">
              <div className="slide-tag-box">
                <span className="slide-military-badge">{currentSlide.tag}</span>
                <span className="slide-category-text">{currentSlide.category}</span>
              </div>
              <div className="slide-index-display">
                0{currentSlideIndex + 1} <span>/ 0{totalSlides}</span>
              </div>
            </div>

            {/* Slide Body Content */}
            <div className="slide-body-content">
              {currentSlide.type === 'title' ? (
                /* Slide 1 - מחלקת טנ"א 402 */
                <div className="title-slide-layout">
                  <div className="title-slide-logo">
                    <img 
                      src="./battalion_logo.png" 
                      alt="סמל גדוד רשף" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <h2 className="title-slide-title">{currentSlide.title}</h2>
                  <p className="title-slide-subtitle">{currentSlide.subtitle}</p>
                  <div className="title-slide-meta">
                    <span>חיל הטכנולוגיה והאחזקה</span>
                    <span>•</span>
                    <span>עוצבת עמוד האש</span>
                    <span>•</span>
                    <span>גדוד 402 רשף</span>
                  </div>
                </div>
              ) : currentSlide.type === 'video' ? (
                /* Slide 2 - סרטון גדודי */
                <div className="video-slide-container">
                  <div className="regular-slide-heading" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2 className="regular-slide-title" style={{ justifyContent: 'center' }}>{currentSlide.title}</h2>
                    <p className="regular-slide-subtitle">{currentSlide.subtitle}</p>
                  </div>

                  <div className="tactical-video-frame">
                    {videoSrc ? (
                      <video 
                        ref={videoRef}
                        src={videoSrc}
                        controls
                        autoPlay
                        className="tactical-video-player"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                    ) : (
                      <div className="video-placeholder-content">
                        <button 
                          className="video-play-pulse-btn"
                          onClick={() => fileInputRef.current?.click()}
                          title="העלאת והפעלת סרטון"
                        >
                          <Play size={36} style={{ marginLeft: '-3px' }} />
                        </button>
                        <h3 className="video-frame-title">סרטון גדודי - גדוד 402 רשף</h3>
                        <p className="video-frame-subtitle">
                          הסרטון הגדודי יועלה ויוקרן כאן. לחץ להעלאת קובץ וידאו מקומי לצפייה מיידית במסך.
                        </p>
                        
                        <div className="video-actions-bar">
                          <label className="video-upload-label">
                            <Upload size={18} />
                            <span>העלה סרטון וידאו (MP4 / WebM)</span>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              accept="video/*" 
                              style={{ display: 'none' }} 
                              onChange={handleVideoUpload}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {videoSrc && (
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <button className="btn-tactical" onClick={handleTogglePlay}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        <span>{isPlaying ? 'השהה סרטון' : 'נגן סרטון'}</span>
                      </button>
                      <button className="btn-tactical" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={16} />
                        <span>החלף סרטון</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : currentSlide.type === 'gallery' ? (
                /* Slide 7 - Gallery 3 images */
                <div className="gallery-slide-container">
                  <div className="regular-slide-heading">
                    <h2 className="regular-slide-title">{currentSlide.title}</h2>
                    <p className="regular-slide-subtitle">{currentSlide.subtitle}</p>
                  </div>

                  <div className="gallery-grid">
                    {[0, 1, 2].map((slotIdx) => {
                      const imgUrl = galleryImages[slotIdx];
                      const inputId = `gallery-upload-input-${slotIdx}`;
                      return (
                        <div className="gallery-card-slot" key={slotIdx}>
                          <span className="gallery-badge-corner">0{slotIdx + 1}</span>
                          <input 
                            id={inputId}
                            type="file" 
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleImageUpload(slotIdx, e.target.files[0]);
                              }
                            }}
                          />
                          {imgUrl ? (
                            <div className="gallery-filled-image-wrapper">
                              <img 
                                src={imgUrl} 
                                alt={`תמונה 0${slotIdx + 1}`} 
                                className="gallery-uploaded-img"
                              />
                              <div className="gallery-image-actions-overlay">
                                <button 
                                  className="btn-tactical"
                                  onClick={() => document.getElementById(inputId)?.click()}
                                  title="החלף תמונה"
                                >
                                  <RotateCw size={15} />
                                  <span>החלף</span>
                                </button>
                                <button 
                                  className="btn-tactical"
                                  style={{ borderColor: '#ef4444', color: '#ff8b8b' }}
                                  onClick={() => handleRemoveImage(slotIdx)}
                                  title="מחק תמונה"
                                >
                                  <Trash2 size={15} />
                                  <span>מחק</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className="gallery-empty-state"
                              onClick={() => document.getElementById(inputId)?.click()}
                            >
                              <div className="gallery-upload-icon-btn">
                                <ImagePlus size={30} />
                              </div>
                              <div className="gallery-slot-title">העלאת תמונה 0{slotIdx + 1}</div>
                              <div className="gallery-slot-hint">לחץ להעלאת תמונת שטח (JPG, PNG)</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Slides 3, 4, 5, 6 - מקצועות טנ"א */
                <div>
                  <div className="regular-slide-heading">
                    <h2 className="regular-slide-title">{currentSlide.title}</h2>
                    <p className="regular-slide-subtitle">{currentSlide.subtitle}</p>
                  </div>

                  <div className="bullets-grid">
                    {currentSlide.bullets?.map((bullet, idx) => {
                      const IconComponent = bullet.icon || Crosshair;
                      return (
                        <div className="bullet-card" key={idx}>
                          <div className="bullet-icon-box">
                            <IconComponent size={20} />
                          </div>
                          <div className="bullet-text-box">
                            <h4>{bullet.title}</h4>
                            <p>{bullet.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="slide-footer-meta">
              <span>{currentSlide.footerNote || 'רשף - גאה להיות שייך'}</span>
              <span className="tactical-code">TANA-402 // COMBAT-READY</span>
            </div>
          </div>

          {/* Navigation Arrow Next (In RTL: on left side) */}
          <button 
            className="nav-arrow-btn nav-arrow-next"
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            title="שקופית הבאה (מקש חץ שמאלה / רווח)"
            aria-label="Next Slide"
          >
            <ChevronLeft size={32} />
          </button>
        </div>
      </main>

      {/* Bottom bar with slide tabs and navigation keys */}
      <footer className="combat-bottom-bar">
        <div className="slide-dots-container">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`slide-dot-tab ${currentSlideIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(index)}
              title={`מעבר לשקופית 0${index + 1}: ${slide.title}`}
            >
              <span className="dot-num">0{index + 1}</span>
              <span>{slide.title}</span>
            </button>
          ))}
        </div>

        <div className="keyboard-hint">
          <span>ניווט מהיר במקלדת:</span>
          <span className="key-kbd">◄</span>
          <span>הבא</span>
          <span>|</span>
          <span className="key-kbd">►</span>
          <span>הקודם</span>
          <span>|</span>
          <span className="key-kbd">Space</span>
          <span>התקדמות</span>
        </div>
      </footer>
    </div>
  );
}
