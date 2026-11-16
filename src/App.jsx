import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Eye,
  Upload,
  Sparkles,
  Activity,
  ShieldCheck,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Clock,
  HardDrive,
  ChevronRight,
  X,
  Sliders,
  ArrowRight,
  Microscope
} from 'lucide-react';

/**
 * BRAND BOTANICAL-OPHTHALMIC EMBLEM (Inspired by Reference Logo)
 */
const OcularisEmblem = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central Caduceus / Optical Stem */}
    <path
      d="M32 10V54"
      stroke="#3B666B"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Intertwined Retinal Serpentine Curves */}
    <path
      d="M32 18C23 22 23 29 32 33C41 37 41 44 32 48"
      stroke="#B58E49"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <path
      d="M32 18C41 22 41 29 32 33C23 37 23 44 32 48"
      stroke="#3B666B"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    {/* Symmetrical Botanical Leaf Branches */}
    <path
      d="M32 24C24 18 14 18 10 24C16 28 24 28 32 24Z"
      stroke="#3B666B"
      strokeWidth="1.6"
      fill="#F9F8F6"
    />
    <path
      d="M32 24C40 18 50 18 54 24C48 28 40 28 32 24Z"
      stroke="#3B666B"
      strokeWidth="1.6"
      fill="#F9F8F6"
    />
    <path
      d="M32 16C26 11 19 10 15 14C19 18 26 18 32 16Z"
      stroke="#B58E49"
      strokeWidth="1.5"
      fill="#F9F8F6"
    />
    <path
      d="M32 16C38 11 45 10 49 14C45 18 38 18 32 16Z"
      stroke="#B58E49"
      strokeWidth="1.5"
      fill="#F9F8F6"
    />
    {/* Upper Optical Iris Crown */}
    <circle cx="32" cy="10" r="3" fill="#B58E49" />
  </svg>
);

/**
 * CLINICAL SAMPLE CASES (Pre-configured Retinal Fundus Scenarios & XAI Coordinates)
 */
const SAMPLE_CASES = [
  {
    id: 'dr-moderate',
    label: 'Moderate Diabetic Retinopathy',
    patientId: 'PT-2026-104',
    age: 58,
    eye: 'OD (Right Eye)',
    condition: 'Diabetic Retinopathy (NPDR)',
    severity: 'Stage 2 • Moderate NPDR',
    severityLevel: 'moderate',
    confidence: 96.4,
    probabilities: [
      { stage: 'No DR (Healthy)', value: 1.2 },
      { stage: 'Mild NPDR', value: 2.1 },
      { stage: 'Moderate NPDR', value: 96.4 },
      { stage: 'Severe / Proliferative DR', value: 0.3 }
    ],
    clinicalFindings: [
      'Clustered dot-blot retinal hemorrhages & microaneurysms localized in superior temporal arcade.',
      'Hard lipid exudates adjacent to the macular boundary highlighted by Grad-CAM peak activation.',
      'Optic disc cup-to-disc ratio remains within normal physiological limits (CDR 0.34).'
    ],
    recommendation:
      'Refer for comprehensive dilated fundus examination within 3–4 weeks and optimize HbA1c glycemic control.',
    fundusStyle: {
      baseHue: '#C94B32',
      edgeHue: '#420D06',
      discCupRatio: 0.34,
      lesions: [
        { type: 'hemorrhage', x: 215, y: 122, r: 5.5 },
        { type: 'microaneurysm', x: 248, y: 146, r: 4 },
        { type: 'exudate', x: 204, y: 158, r: 4.5 },
        { type: 'hemorrhage', x: 232, y: 222, r: 5 }
      ],
      gradCamHotspots: [
        { x: 218, y: 128, r: 56, intensity: 0.95 },
        { x: 242, y: 152, r: 44, intensity: 0.8 },
        { x: 230, y: 220, r: 42, intensity: 0.72 }
      ],
      shapPoints: [
        { x: 215, y: 122, weight: 0.96 },
        { x: 248, y: 146, weight: 0.88 },
        { x: 204, y: 158, weight: 0.84 },
        { x: 232, y: 222, weight: 0.79 }
      ]
    }
  },
  {
    id: 'glaucoma-suspect',
    label: 'Primary Open-Angle Glaucoma',
    patientId: 'PT-2026-219',
    age: 66,
    eye: 'OS (Left Eye)',
    condition: 'Glaucomatous Optic Neuropathy',
    severity: 'High Risk • Advanced Cupping',
    severityLevel: 'severe',
    confidence: 94.8,
    probabilities: [
      { stage: 'Normal Optic Nerve', value: 1.8 },
      { stage: 'Glaucoma Suspect', value: 3.4 },
      { stage: 'Confirmed Glaucoma', value: 94.8 }
    ],
    clinicalFindings: [
      'Pronounced vertical elongation and enlargement of the optic cup (Cup-to-Disc Ratio 0.78).',
      'Inferior neuroretinal rim thinning ("ISNT rule" violation) strongly weighted by SHAP attribution.',
      'Peripapillary retinal nerve fiber layer (RNFL) wedge defect radiating inferotemporally.'
    ],
    recommendation:
      'Urgent ophthalmology referral for Optical Coherence Tomography (OCT-RNFL), Humphrey Visual Field testing, and IOP tonometry.',
    fundusStyle: {
      baseHue: '#BF472E',
      edgeHue: '#3B0B05',
      discCupRatio: 0.78,
      lesions: [
        { type: 'microaneurysm', x: 112, y: 175, r: 14 }
      ],
      gradCamHotspots: [
        { x: 112, y: 175, r: 62, intensity: 0.98 },
        { x: 138, y: 214, r: 40, intensity: 0.68 }
      ],
      shapPoints: [
        { x: 112, y: 166, weight: 0.98 },
        { x: 112, y: 184, weight: 0.95 },
        { x: 124, y: 175, weight: 0.85 },
        { x: 138, y: 214, weight: 0.74 }
      ]
    }
  },
  {
    id: 'healthy-normal',
    label: 'Healthy Normal Retina',
    patientId: 'PT-2026-308',
    age: 41,
    eye: 'OD (Right Eye)',
    condition: 'No Ocular Pathology Detected',
    severity: 'Normal • Routine Screening',
    severityLevel: 'normal',
    confidence: 98.7,
    probabilities: [
      { stage: 'Healthy Retina', value: 98.7 },
      { stage: 'Diabetic Retinopathy', value: 0.8 },
      { stage: 'Glaucoma Suspect', value: 0.5 }
    ],
    clinicalFindings: [
      'Crisp optic disc margins with healthy pink neuroretinal rim and physiological cup (CDR 0.28).',
      'Uniform macular pigmentation with intact foveal reflex and zero vascular leakage or exudates.',
      'Normal arteriovenous caliber ratio across superior and inferior temporal vascular arcades.'
    ],
    recommendation:
      'No acute retinal pathology detected. Recommend routine annual ophthalmic screening.',
    fundusStyle: {
      baseHue: '#D15136',
      edgeHue: '#470E07',
      discCupRatio: 0.28,
      lesions: [],
      gradCamHotspots: [
        { x: 114, y: 175, r: 46, intensity: 0.42 },
        { x: 222, y: 178, r: 48, intensity: 0.38 }
      ],
      shapPoints: [
        { x: 114, y: 175, weight: 0.52 },
        { x: 222, y: 178, weight: 0.48 }
      ]
    }
  }
];

/**
 * MULTI-MODEL COMPARATIVE BENCHMARK DATASET
 * Compares CNN - ResNet-50, EfficientNet-B3, and Vision Transformer (ViT-B/16)
 */
const MODEL_BENCHMARKS = [
  {
    id: 'efficientnet',
    name: 'EfficientNet-B3',
    badge: 'Recommended Clinical Balance',
    architecture: 'Compound-Scaled Mobile Inverted Bottleneck CNN',
    summary:
      'Delivers the optimal trade-off between diagnostic sensitivity and sub-50ms inference speed, making it ideal for real-time hospital web deployment.',
    accuracy: 96.4,
    sensitivity: 95.8,
    specificity: 97.1,
    inferenceMs: 42,
    memoryMb: 48
  },
  {
    id: 'vit',
    name: 'Vision Transformer (ViT-B/16)',
    badge: 'Highest Peak Accuracy',
    architecture: 'Self-Attention Patch Sequence Transformer (16×16)',
    summary:
      'Captures long-range spatial relationships between the optic disc and peripheral macula, achieving peak sensitivity at higher compute cost.',
    accuracy: 97.1,
    sensitivity: 96.9,
    specificity: 97.4,
    inferenceMs: 118,
    memoryMb: 330
  },
  {
    id: 'resnet50',
    name: 'CNN – ResNet-50',
    badge: 'Interpretable Grad-CAM Baseline',
    architecture: '50-Layer Deep Residual Convolutional Network',
    summary:
      'Provides highly localized spatial feature maps in final residual blocks, producing crisp Grad-CAM overlays for microaneurysm verification.',
    accuracy: 94.2,
    sensitivity: 93.1,
    specificity: 95.3,
    inferenceMs: 64,
    memoryMb: 98
  }
];

/**
 * BESPOKE HERO OPHTHALMIC IRIS & RETINAL FUNDUS XAI ILLUSTRATION
 */
const HeroOphthalmicVisual = () => (
  <div className="relative w-full aspect-[4/4.3] rounded-tl-[96px] rounded-br-[96px] rounded-tr-2xl rounded-bl-2xl overflow-hidden bg-gradient-to-b from-[#162220] via-[#1C2C2A] to-[#111A19] border border-white/15 flex flex-col justify-between p-5 sm:p-6">
    {/* Subtle Clinical Coordinate Grid & Radial Glow Backdrop */}
    <svg
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      aria-label="Anatomical Human Iris and Retinal Fundus XAI Diagnostic Scan"
    >
      <defs>
        <radialGradient id="heroAmbientGlow" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#3B666B" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#1E3230" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0E1615" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="scleraGrad" x1="40" y1="195" x2="360" y2="195" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#263836" />
          <stop offset="22%" stopColor="#DCE6E4" />
          <stop offset="50%" stopColor="#F5F7F6" />
          <stop offset="78%" stopColor="#DCE6E4" />
          <stop offset="100%" stopColor="#263836" />
        </linearGradient>

        <radialGradient id="irisStromaGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0E1716" />
          <stop offset="46%" stopColor="#2A4D52" />
          <stop offset="74%" stopColor="#3B666B" />
          <stop offset="90%" stopColor="#233F43" />
          <stop offset="100%" stopColor="#142628" />
        </radialGradient>

        <radialGradient id="pupilFundusGrad" cx="46%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D45438" />
          <stop offset="58%" stopColor="#9E2B16" />
          <stop offset="88%" stopColor="#5C160B" />
          <stop offset="100%" stopColor="#2B0904" />
        </radialGradient>

        <radialGradient id="pupilGradCam" cx="62%" cy="44%" r="36%">
          <stop offset="0%" stopColor="#FF3B1D" stopOpacity="0.88" />
          <stop offset="45%" stopColor="#FBBF24" stopOpacity="0.62" />
          <stop offset="80%" stopColor="#34D399" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
        </radialGradient>

        <clipPath id="eyeApertureClip">
          <path d="M36 195C88 118 148 92 200 92C252 92 312 118 364 195C312 272 252 298 200 298C148 298 88 272 36 195Z" />
        </clipPath>

        <clipPath id="pupilWindowClip">
          <circle cx="200" cy="195" r="46" />
        </clipPath>
      </defs>

      <rect width="400" height="420" fill="url(#heroAmbientGlow)" />

      <circle cx="200" cy="195" r="154" stroke="#7FD1C8" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="200" cy="195" r="126" stroke="#B58E49" strokeOpacity="0.22" strokeWidth="1" />
      <line x1="200" y1="26" x2="200" y2="56" stroke="#B58E49" strokeOpacity="0.45" strokeWidth="1.2" />
      <line x1="200" y1="334" x2="200" y2="364" stroke="#B58E49" strokeOpacity="0.45" strokeWidth="1.2" />
      <line x1="22" y1="195" x2="48" y2="195" stroke="#7FD1C8" strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1="352" y1="195" x2="378" y2="195" stroke="#7FD1C8" strokeOpacity="0.35" strokeWidth="1.2" />

      <path
        d="M52 154C102 96 154 74 200 74C246 74 298 96 348 154"
        stroke="#B58E49"
        strokeOpacity="0.42"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <g clipPath="url(#eyeApertureClip)">
        <rect x="30" y="88" width="340" height="214" fill="url(#scleraGrad)" />

        <path d="M52 186C72 182 88 189 104 185" stroke="#C97A7E" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M60 206C78 211 94 204 110 209" stroke="#C97A7E" strokeOpacity="0.3" strokeWidth="0.9" />
        <path d="M348 188C328 183 312 190 296 186" stroke="#C97A7E" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M340 208C322 212 306 205 290 210" stroke="#C97A7E" strokeOpacity="0.3" strokeWidth="0.9" />

        <circle cx="200" cy="195" r="88" fill="url(#irisStromaGrad)" />

        {Array.from({ length: 36 }).map((_, idx) => {
          const angle = (idx * 10 * Math.PI) / 180;
          const x1 = 200 + Math.cos(angle) * 48;
          const y1 = 195 + Math.sin(angle) * 48;
          const x2 = 200 + Math.cos(angle) * 84;
          const y2 = 195 + Math.sin(angle) * 84;
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={idx % 3 === 0 ? '#E6C587' : '#8AD4CC'}
              strokeOpacity={idx % 3 === 0 ? '0.28' : '0.2'}
              strokeWidth={idx % 2 === 0 ? '1.1' : '0.7'}
            />
          );
        })}

        <circle
          cx="200"
          cy="195"
          r="62"
          stroke="#B58E49"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />

        <g clipPath="url(#pupilWindowClip)">
          <circle cx="200" cy="195" r="46" fill="url(#pupilFundusGrad)" />

          <circle cx="180" cy="196" r="10.5" fill="#FDE68A" fillOpacity="0.92" />
          <circle cx="180" cy="196" r="4.2" fill="#FFFBEB" />

          <path
            d="M180 194C192 174 212 169 236 179"
            stroke="#590D08"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M180 198C193 218 214 222 238 211"
            stroke="#590D08"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M180 193C172 176 164 166 156 158"
            stroke="#6B120C"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M180 199C172 215 164 225 156 233"
            stroke="#6B120C"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M202 177C210 185 216 189 223 191"
            stroke="#6B120C"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M203 213C211 205 217 201 224 199"
            stroke="#6B120C"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          <circle cx="200" cy="195" r="46" fill="url(#pupilGradCam)" />

          <circle
            cx="221"
            cy="187"
            r="9.5"
            stroke="#FCD34D"
            strokeWidth="1.4"
            strokeDasharray="2.5 2"
          />
          <circle cx="221" cy="187" r="2" fill="#FFFBEB" />
        </g>

        <circle cx="200" cy="195" r="46" stroke="#0E1716" strokeWidth="2.2" />
        <ellipse
          cx="176"
          cy="171"
          rx="11"
          ry="6"
          transform="rotate(-28 176 171)"
          fill="#FFFFFF"
          fillOpacity="0.48"
        />
        <circle cx="166" cy="183" r="2.8" fill="#FFFFFF" fillOpacity="0.35" />

        <path
          d="M36 195C88 118 148 92 200 92C252 92 312 118 364 195C312 134 252 112 200 112C148 112 88 134 36 195Z"
          fill="#0F1918"
          fillOpacity="0.42"
        />
      </g>

      <path
        d="M36 195C88 118 148 92 200 92C252 92 312 118 364 195"
        stroke="#E6C587"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M36 195C88 272 148 298 200 298C252 298 312 272 364 195"
        stroke="#7FD1C8"
        strokeOpacity="0.65"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle cx="116" cy="122" r="3" fill="#B58E49" />
      <circle cx="284" cy="122" r="3" fill="#B58E49" />
      <circle cx="116" cy="268" r="2.8" fill="#7FD1C8" />
      <circle cx="284" cy="268" r="2.8" fill="#7FD1C8" />
    </svg>

    {/* Top Telemetry Header Row */}
    <div className="relative z-10 flex items-center justify-between text-[11px] px-1">
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-[#E6C587] font-semibold tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Retinal Fundus + XAI</span>
      </span>
      <span className="text-white/75 font-medium tracking-wide bg-black/35 px-2.5 py-1 rounded-full">
        Grad-CAM Active
      </span>
    </div>

    {/* Bottom Clinical Diagnostic HUD Card */}
    <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 text-white border border-white/15 shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#E6C587] font-semibold">
            DR &amp; Glaucoma Early Screening
          </p>
          <p className="text-sm sm:text-[15px] font-semibold mt-0.5 text-white">
            Biomarker Localization Verified
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-[#B58E49] text-white text-xs font-bold block">
            96.4% Acc
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/75">
        <span>Optic Disc &amp; Macula Scan</span>
        <span className="text-[#8AD4CC] font-semibold">EfficientNet-B3 • 42ms</span>
      </div>
    </div>
  </div>
);

/**
 * INTERACTIVE RETINAL FUNDUS + XAI HEATMAP CANVAS
 */
const RetinalXaiCanvas = ({
  caseData,
  uploadedImageUrl,
  xaiMode,
  opacity,
  zoom,
  showAnnotations
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 360;
    canvas.width = size;
    canvas.height = size;

    const renderOverlays = () => {
      const alpha = opacity / 100;

      // 1. GRAD-CAM HEATMAP OVERLAY
      if (xaiMode === 'gradcam' && alpha > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
        ctx.clip();

        // Subtle cool-blue baseline activation across retina
        ctx.fillStyle = `rgba(28, 78, 148, ${0.22 * alpha})`;
        ctx.fillRect(0, 0, size, size);

        // Thermal hotspots (Red -> Yellow -> Green -> Cyan)
        caseData.fundusStyle.gradCamHotspots.forEach((spot) => {
          const grad = ctx.createRadialGradient(
            spot.x,
            spot.y,
            2,
            spot.x,
            spot.y,
            spot.r
          );
          grad.addColorStop(0, `rgba(255, 25, 0, ${0.9 * spot.intensity * alpha})`);
          grad.addColorStop(0.35, `rgba(255, 195, 0, ${0.78 * spot.intensity * alpha})`);
          grad.addColorStop(0.68, `rgba(45, 220, 110, ${0.48 * spot.intensity * alpha})`);
          grad.addColorStop(1, 'rgba(28, 78, 148, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(spot.x, spot.y, spot.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // 2. SHAP PIXEL ATTRIBUTION OVERLAY
      if (xaiMode === 'shap' && alpha > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
        ctx.clip();

        // Darken non-contributing background slightly for high SHAP contrast
        ctx.fillStyle = `rgba(15, 23, 42, ${0.32 * alpha})`;
        ctx.fillRect(0, 0, size, size);

        // Render high-attribution SHAP feature blocks (magenta/crimson positive drivers)
        caseData.fundusStyle.shapPoints.forEach((pt) => {
          for (let dx = -12; dx <= 12; dx += 6) {
            for (let dy = -12; dy <= 12; dy += 6) {
              const dist = Math.hypot(dx, dy);
              if (dist <= 13) {
                const localStrength = (1 - dist / 15) * pt.weight;
                ctx.fillStyle =
                  localStrength > 0.65
                    ? `rgba(244, 63, 94, ${0.88 * localStrength * alpha})`
                    : `rgba(56, 189, 248, ${0.65 * localStrength * alpha})`;
                ctx.fillRect(pt.x + dx - 2.5, pt.y + dy - 2.5, 5, 5);
              }
            }
          }
        });
        ctx.restore();
      }

      // 3. CLINICAL PATHOLOGY CALLOUT RINGS
      if (showAnnotations && caseData.fundusStyle.lesions.length > 0) {
        ctx.save();
        caseData.fundusStyle.lesions.forEach((lesion, idx) => {
          ctx.strokeStyle = '#FCD34D';
          ctx.lineWidth = 1.75;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.arc(lesion.x, lesion.y, lesion.r + 7, 0, Math.PI * 2);
          ctx.stroke();

          // Numbered clinical marker badge
          ctx.setLineDash([]);
          ctx.fillStyle = '#B58E49';
          ctx.beginPath();
          ctx.arc(lesion.x + lesion.r + 7, lesion.y - lesion.r - 4, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(idx + 1), lesion.x + lesion.r + 7, lesion.y - lesion.r - 4);
        });
        ctx.restore();
      }
    };

    // Draw dark clinical surround
    ctx.fillStyle = '#141D1C';
    ctx.fillRect(0, 0, size, size);

    if (uploadedImageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, size * 0.05, size * 0.05, size * 0.9, size * 0.9);
        ctx.restore();
        renderOverlays();
      };
      img.src = uploadedImageUrl;
      return;
    }

    // Synthetic High-Detail Retinal Fundus Rendering
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
    ctx.clip();

    // Radial retinal choroid gradient
    const bgGrad = ctx.createRadialGradient(
      size * 0.48,
      size * 0.5,
      20,
      size * 0.5,
      size * 0.5,
      size * 0.46
    );
    bgGrad.addColorStop(0, caseData.fundusStyle.baseHue);
    bgGrad.addColorStop(0.75, '#8f2614');
    bgGrad.addColorStop(1, caseData.fundusStyle.edgeHue);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    // Subtle Macula / Fovea dark zone (temporal side)
    const maculaGrad = ctx.createRadialGradient(225, 178, 4, 225, 178, 42);
    maculaGrad.addColorStop(0, 'rgba(65, 14, 8, 0.65)');
    maculaGrad.addColorStop(1, 'rgba(65, 14, 8, 0)');
    ctx.fillStyle = maculaGrad;
    ctx.beginPath();
    ctx.arc(225, 178, 42, 0, Math.PI * 2);
    ctx.fill();

    // Optic Nerve Head (Optic Disc)
    const discX = 112;
    const discY = 175;
    const discRadius = 26;
    const discGrad = ctx.createRadialGradient(discX, discY, 4, discX, discY, discRadius);
    discGrad.addColorStop(0, '#FFF3D1');
    discGrad.addColorStop(0.7, '#F7C57E');
    discGrad.addColorStop(1, '#E07A48');
    ctx.fillStyle = discGrad;
    ctx.beginPath();
    ctx.arc(discX, discY, discRadius, 0, Math.PI * 2);
    ctx.fill();

    // Optic Cup (scales dynamically based on Cup-to-Disc Ratio)
    const cupRadius = discRadius * caseData.fundusStyle.discCupRatio;
    ctx.fillStyle = 'rgba(255, 250, 235, 0.88)';
    ctx.beginPath();
    ctx.arc(discX + 1, discY, cupRadius, 0, Math.PI * 2);
    ctx.fill();

    // Retinal Vascular Arcades (Superior & Inferior Arteries/Veins)
    const drawVessel = (points, width, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i][0] + points[i + 1][0]) / 2;
        const yc = (points[i][1] + points[i + 1][1]) / 2;
        ctx.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
      }
      ctx.lineTo(points[points.length - 1][0], points[points.length - 1][1]);
      ctx.stroke();
    };

    // Main venules & arterioles radiating from optic disc
    drawVessel([[112, 172], [140, 120], [195, 95], [260, 108], [305, 140]], 3.2, 'rgba(92, 14, 10, 0.78)');
    drawVessel([[112, 178], [145, 232], [205, 255], [268, 240], [310, 205]], 3.2, 'rgba(92, 14, 10, 0.78)');
    drawVessel([[112, 170], [92, 122], [75, 82]], 2.5, 'rgba(105, 18, 12, 0.72)');
    drawVessel([[112, 180], [94, 230], [78, 274]], 2.5, 'rgba(105, 18, 12, 0.72)');
    // Secondary macular branches
    drawVessel([[168, 106], [195, 134], [218, 152]], 1.6, 'rgba(110, 20, 12, 0.65)');
    drawVessel([[172, 245], [202, 218], [222, 198]], 1.6, 'rgba(110, 20, 12, 0.65)');
    drawVessel([[235, 102], [248, 136], [255, 158]], 1.4, 'rgba(110, 20, 12, 0.6)');

    // Pathological Markers (Microaneurysms, Hemorrhages, Hard Exudates)
    caseData.fundusStyle.lesions.forEach((lesion) => {
      if (lesion.type === 'hemorrhage' || lesion.type === 'microaneurysm') {
        ctx.fillStyle = 'rgba(72, 6, 6, 0.88)';
        ctx.beginPath();
        ctx.arc(lesion.x, lesion.y, lesion.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (lesion.type === 'exudate') {
        ctx.fillStyle = 'rgba(253, 224, 71, 0.85)';
        ctx.beginPath();
        ctx.arc(lesion.x, lesion.y, lesion.r, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.restore();
    renderOverlays();
  }, [caseData, uploadedImageUrl, xaiMode, opacity, showAnnotations]);

  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto rounded-2xl overflow-hidden bg-[#141D1C] border border-[#3B666B]/30 shadow-inner flex items-center justify-center">
      <div
        className="transition-transform duration-200 ease-out w-full h-full flex items-center justify-center"
        style={{ transform: `scale(${zoom})` }}
      >
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      </div>

      {/* Subtle Clinical Corner Reticle Labels */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-[11px] font-medium tracking-wider text-white/90 uppercase">
        {xaiMode === 'original' && 'Raw Fundus'}
        {xaiMode === 'gradcam' && `Grad-CAM (${opacity}%)`}
        {xaiMode === 'shap' && `SHAP Attribution (${opacity}%)`}
      </div>
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-[11px] text-white/80">
        {Math.round(zoom * 100)}% Zoom
      </div>
    </div>
  );
};

export default function App() {
  // Top Banner Dismissal State
  const [showBanner, setShowBanner] = useState(true);

  // Screening Workspace State
  const [selectedCaseId, setSelectedCaseId] = useState('dr-moderate');
  const [patientId, setPatientId] = useState('PT-2026-104');
  const [patientAge, setPatientAge] = useState('58');
  const [selectedEye, setSelectedEye] = useState('OD (Right Eye)');
  const [selectedModelId, setSelectedModelId] = useState('efficientnet');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Simulated Inference Pipeline State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');

  // Explainable AI (XAI) Viewer Controls
  const [xaiMode, setXaiMode] = useState('gradcam'); // 'original' | 'gradcam' | 'shap'
  const [heatmapOpacity, setHeatmapOpacity] = useState(72);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAnnotations, setShowAnnotations] = useState(true);

  // Benchmark Metric Highlight Filter
  const [activeMetricView, setActiveMetricView] = useState('all');

  const workspaceRef = useRef(null);
  const benchmarksRef = useRef(null);
  const aboutRef = useRef(null);
  const fileInputRef = useRef(null);

  const activeCase = useMemo(
    () => SAMPLE_CASES.find((c) => c.id === selectedCaseId) || SAMPLE_CASES[0],
    [selectedCaseId]
  );

  const activeModel = useMemo(
    () => MODEL_BENCHMARKS.find((m) => m.id === selectedModelId) || MODEL_BENCHMARKS[0],
    [selectedModelId]
  );

  // Handle preset selection with realistic simulated neural network inference
  const runSimulatedScreening = (targetCaseId = selectedCaseId, customImg = uploadedImageUrl) => {
    setIsAnalyzing(true);
    setAnalysisStep('Preprocessing retinal fundus & normalizing illumination...');

    setTimeout(() => {
      setAnalysisStep(`Running ${activeModel.name} forward inference pass...`);
    }, 450);

    setTimeout(() => {
      setAnalysisStep('Computing Grad-CAM & SHAP feature attribution maps...');
    }, 900);

    setTimeout(() => {
      const nextCase = SAMPLE_CASES.find((c) => c.id === targetCaseId) || SAMPLE_CASES[0];
      setSelectedCaseId(nextCase.id);
      if (!customImg) {
        setPatientId(nextCase.patientId);
        setPatientAge(String(nextCase.age));
        setSelectedEye(nextCase.eye);
      }
      setIsAnalyzing(false);
      setAnalysisStep('');
      setXaiMode('gradcam');
      setHeatmapOpacity(75);
    }, 1350);
  };

  const handlePresetClick = (preset) => {
    setUploadedImageUrl(null);
    runSimulatedScreening(preset.id, null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setUploadedImageUrl(dataUrl);
      runSimulatedScreening(selectedCaseId, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2B3A38] font-sans selection:bg-[#3B666B] selection:text-white">
      {/* Google Fonts Import for Editorial Serif + Crisp Geometric Sans */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-editorial {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* 1. TOP ANNOUNCEMENT / CLINICAL DISCLAIMER BAR (#3B666B) */}
      {showBanner && (
        <div className="bg-[#3B666B] text-white px-4 py-2.5 text-xs sm:text-[13px] tracking-wide relative z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-center text-center pr-6">
            <p className="font-normal">
              <span className="font-semibold tracking-wider uppercase text-[#F3D8A4] mr-1.5">
                Clinical Decision Support:
              </span>
              Designed to assist ophthalmologists with early screening—not a replacement for medical diagnosis.{' '}
              <button
                onClick={() => scrollToSection(benchmarksRef)}
                className="underline underline-offset-4 hover:text-[#F3D8A4] transition-colors font-medium ml-1 inline-flex items-center cursor-pointer"
              >
                View Research Benchmarks →
              </button>
            </p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss clinical banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/75 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. EDITORIAL HEADER NAVIGATION (Centered Emblem + Left Links + Right Pill CTA) */}
      <header className="sticky top-0 z-20 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#2B3A38]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-[14px] font-medium text-[#2B3A38]/85">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-[#3B666B] transition-colors cursor-pointer"
            >
              Discover
            </button>
            <button
              onClick={() => scrollToSection(workspaceRef)}
              className="hover:text-[#3B666B] transition-colors cursor-pointer"
            >
              Screening
            </button>
            <button
              onClick={() => {
                setXaiMode('gradcam');
                scrollToSection(workspaceRef);
              }}
              className="hover:text-[#3B666B] transition-colors cursor-pointer"
            >
              XAI Diagnostics
            </button>
            <button
              onClick={() => scrollToSection(benchmarksRef)}
              className="hover:text-[#3B666B] transition-colors cursor-pointer"
            >
              Research Lab
            </button>
          </nav>

          {/* Center Brand Emblem & Stacked Serif Logo */}
          <a
            href="#top"
            className="flex items-center space-x-3 mx-auto md:mx-0 group"
          >
            <OcularisEmblem className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col leading-none">
              <span className="font-editorial text-xl sm:text-2xl tracking-[0.18em] text-[#3B666B] font-semibold uppercase">
                OCULENS
              </span>
              <span className="font-editorial text-sm sm:text-base tracking-[0.26em] text-[#3B666B]/90 uppercase mt-0.5">
                RETINAL AI
              </span>
            </div>
          </a>

          {/* Right Header Actions (Asymmetric Rounded Pill CTA) */}
          <div className="flex items-center space-x-4">
            <span className="hidden lg:inline-flex items-center text-xs uppercase tracking-widest text-[#3B666B] font-semibold">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-[#B58E49]" />
              XAI v1.0
            </span>
            <button
              onClick={() => scrollToSection(workspaceRef)}
              className="bg-[#3B666B] hover:bg-[#2E5256] text-white text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase px-5 sm:px-7 py-3.5 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm shadow-sm transition-all duration-200 cursor-pointer"
            >
              Run Screening
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Organic Sage Wave Ribbon + Asymmetric Leaf-Arch Frame + Editorial Serif Typography) */}
      <section id="top" className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
        {/* Flowing Dual-Tone Sage/Teal Organic Wave Ribbons (Matching Reference Screenshot) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-4 sm:bottom-8 z-0"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[180px] sm:h-[240px] object-cover"
            preserveAspectRatio="none"
          >
            {/* Upper Soft Sage Ribbon */}
            <path
              d="M0 40C260 145 520 190 840 135C1120 86 1300 72 1440 95V230H0V40Z"
              fill="#A3B5B0"
              fillOpacity="0.65"
            />
            {/* Lower Deep Slate-Teal Ribbon */}
            <path
              d="M0 115C310 185 650 185 980 155C1210 134 1350 132 1440 145V235H0V115Z"
              fill="#5D7E7B"
              fillOpacity="0.88"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT COLUMN: Asymmetric Arch-Cutout Frame + Decorative Gold & Teal Botanical Petals */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[400px]">
                {/* Decorative Leaf / Petal Accents on Top-Left Corner (Exact signature motif from reference) */}
                <svg
                  viewBox="0 0 90 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-20 sm:w-20 sm:h-24 absolute -top-6 -left-6 z-20 drop-shadow-sm pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Warm Ochre / Gold Petal (#B58E49) */}
                  <path
                    d="M14 6C28 10 35 25 32 42C17 38 10 23 14 6Z"
                    fill="#B58E49"
                  />
                  {/* Deep Forest Petal (#2B3A38) */}
                  <path
                    d="M52 14C42 26 42 42 52 54C62 42 62 26 52 14Z"
                    fill="#2B3A38"
                  />
                  {/* Primary Teal Petal (#3B666B) */}
                  <path
                    d="M16 62C31 58 46 66 52 80C37 84 22 76 16 62Z"
                    fill="#3B666B"
                  />
                </svg>

                {/* Asymmetric Rounded Frame showcasing the Anatomical Eye & Retinal Fundus XAI Visual */}
                <div className="relative bg-[#1E2B2A] rounded-tl-[110px] rounded-br-[110px] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-3.5 shadow-2xl border-4 border-white/85">
                  <HeroOphthalmicVisual />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Editorial Eyebrow, Serif Display Headline & Warm Ochre CTA */}
            <div className="lg:col-span-7 text-left lg:pl-6">
              <p className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#3B666B] mb-4">
                Explainable Ophthalmic Screening Platform
              </p>

              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-[64px] leading-[1.06] text-[#2B3A38] font-medium tracking-tight">
                Early detection <span className="italic font-normal text-[#3B666B]">you</span> can trust with transparent clinical AI
              </h1>

              <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#2B3A38]/85 max-w-2xl bg-[#F9F8F6]/70 sm:bg-transparent rounded-xl p-2 sm:p-0">
                At OcuLens Retinal AI, we combine deep learning screening for{' '}
                <strong className="font-semibold text-[#2B3A38]">Diabetic Retinopathy</strong> and{' '}
                <strong className="font-semibold text-[#2B3A38]">Glaucoma</strong> with visual{' '}
                <strong className="font-semibold text-[#2B3A38]">Grad-CAM &amp; SHAP heatmaps</strong>—empowering clinicians to verify every prediction with complete confidence.
              </p>

              {/* CTA Row: Warm Ochre Pill Button (#B58E49) */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection(workspaceRef)}
                  className="bg-[#B58E49] hover:bg-[#9E7A3B] text-white text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase px-8 py-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center cursor-pointer"
                >
                  Start Retinal Screening
                  <ArrowRight className="w-4 h-4 ml-2.5" />
                </button>

                <button
                  onClick={() => scrollToSection(benchmarksRef)}
                  className="bg-white/90 hover:bg-white text-[#2B3A38] border border-[#2B3A38]/15 text-xs sm:text-[13px] font-semibold tracking-[0.1em] uppercase px-6 py-4 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Compare AI Models
                </button>
              </div>

              {/* Three Pillars Micro-Bar */}
              <div className="mt-10 pt-6 border-t border-[#2B3A38]/15 grid grid-cols-3 gap-4 max-w-xl">
                <div>
                  <p className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2B3A38]">
                    2 Diseases
                  </p>
                  <p className="text-xs text-[#2B3A38]/75 mt-0.5">
                    DR &amp; Glaucoma Staging
                  </p>
                </div>
                <div>
                  <p className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2B3A38]">
                    Grad-CAM + SHAP
                  </p>
                  <p className="text-xs text-[#2B3A38]/75 mt-0.5">
                    Visual XAI Heatmaps
                  </p>
                </div>
                <div>
                  <p className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2B3A38]">
                    3 Architectures
                  </p>
                  <p className="text-xs text-[#2B3A38]/75 mt-0.5">
                    ResNet, EfficientNet, ViT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. DISCOVER OCULENS EDITORIAL SECTION (Exact Reference Layout: Top Sage/Teal Wave + Left Gold Serif + Right Tall Rounded Arch with Gold & Teal Petals) */}
      <section
        ref={aboutRef}
        className="relative bg-[#F9F8F6] overflow-hidden pb-20 sm:pb-28"
      >
        {/* Top Layered Organic Wave Banner (#5D7E7B & #A3B5B0) */}
        <div className="w-full overflow-hidden leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 165"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[100px] sm:h-[155px] block"
            preserveAspectRatio="none"
          >
            {/* Soft Sage Wave Layer */}
            <path
              d="M0 0H1440V145C1240 52 960 6 660 45C390 80 180 128 0 112V0Z"
              fill="#A3B5B0"
              fillOpacity="0.68"
            />
            {/* Deep Slate-Teal Upper Wave Layer */}
            <path
              d="M0 0H1440V92C1230 28 940 -4 620 26C350 51 160 68 0 54V0Z"
              fill="#5D7E7B"
              fillOpacity="0.92"
            />
          </svg>
        </div>

        {/* Two-Column Asymmetric Editorial Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* LEFT COLUMN: Warm Gold Editorial Serif Title + Two Clinical Paragraphs + Ochre CTA */}
            <div className="lg:col-span-6 lg:pr-6">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] text-[#B58E49] font-normal tracking-tight">
                Discover OcuLens Clinical Screening
              </h2>

              <p className="mt-6 text-[15px] sm:text-base leading-[1.75] text-[#2B3A38]/85">
                Welcome to a new standard in preventative ophthalmic care, where early retinal screening meets transparent deep learning science. Engineered to detect{' '}
                <strong className="font-semibold text-[#2B3A38]">Diabetic Retinopathy</strong> and{' '}
                <strong className="font-semibold text-[#2B3A38]">Glaucoma</strong> at their earliest stages, OcuLens analyzes high-resolution fundus imagery to classify disease presence and severity grading—helping patients receive timely clinical intervention before irreversible vision loss occurs.
              </p>

              <p className="mt-5 text-[15px] sm:text-base leading-[1.75] text-[#2B3A38]/85">
                Unlike traditional &ldquo;black-box&rdquo; algorithms, our Explainable AI engine pairs every prediction with visual{' '}
                <strong className="font-semibold text-[#2B3A38]">Grad-CAM and SHAP heatmaps</strong> that pinpoint microaneurysms, retinal blood spots, and optic disc cupping—backed by rigorous benchmarking across ResNet-50, EfficientNet-B3, and Vision Transformers.
              </p>

              <div className="mt-9">
                <button
                  onClick={() => scrollToSection(workspaceRef)}
                  className="bg-[#B58E49] hover:bg-[#9E7A3B] text-white text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  Launch Screening Studio
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Tall Rounded-Arch Frame with Deep Forest Architectural Backdrop & Overlapping Gold/Teal Botanical Petals */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[430px] pt-4 pb-4 px-4">
                {/* Upper-Left Overlapping Warm Gold Botanical Leaf Cluster (#B58E49) */}
                <svg
                  viewBox="0 0 110 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-22 sm:w-24 sm:h-28 absolute -top-2 -left-1 z-20 pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Top-left gold leaf */}
                  <path
                    d="M18 14C34 15 46 28 47 45C31 44 19 31 18 14Z"
                    fill="#B58E49"
                  />
                  {/* Upper-right gold leaf */}
                  <path
                    d="M66 10C54 22 52 38 61 52C73 40 75 24 66 10Z"
                    fill="#B58E49"
                  />
                  {/* Middle-left gold leaf */}
                  <path
                    d="M22 60C38 56 54 63 60 78C44 82 28 75 22 60Z"
                    fill="#B58E49"
                  />
                  {/* Lower-right gold leaf */}
                  <path
                    d="M84 54C71 63 66 78 73 93C86 84 91 69 84 54Z"
                    fill="#B58E49"
                  />
                  {/* Bottom-left gold leaf */}
                  <path
                    d="M36 96C50 90 65 94 73 107C59 113 44 109 36 96Z"
                    fill="#B58E49"
                  />
                </svg>

                {/* Tall Vertical Rounded-Arch Container (Matching Reference Arch Proportions) */}
                <div className="relative w-full h-[460px] sm:h-[510px] rounded-t-[215px] rounded-b-none overflow-hidden bg-[#26332F] shadow-xl border border-[#2B3A38]/15 flex flex-col justify-between">
                  {/* Medical-Grade Ophthalmology Diagnostic Suite Illustration (Self-Contained SVG) */}
                  <svg
                    viewBox="0 0 430 510"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full object-cover"
                    role="img"
                    aria-label="Modern ophthalmology diagnostic workstation with fundus retinal camera and calibrated Grad-CAM clinical display"
                  >
                    <defs>
                      {/* Warm-Lit Ophthalmic Suite Backdrop Gradient */}
                      <linearGradient id="suiteWallGrad" x1="215" y1="0" x2="215" y2="510" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#354641" />
                        <stop offset="52%" stopColor="#263430" />
                        <stop offset="100%" stopColor="#1B2522" />
                      </linearGradient>

                      {/* Ambient Recessed Ceiling Halo */}
                      <radialGradient id="ceilingHalo" cx="50%" cy="18%" r="48%">
                        <stop offset="0%" stopColor="#F3D8A4" stopOpacity="0.22" />
                        <stop offset="55%" stopColor="#5D7E7B" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#263430" stopOpacity="0" />
                      </radialGradient>

                      {/* Calibrated Clinical Display Screen Glow */}
                      <linearGradient id="monitorBezelGrad" x1="120" y1="108" x2="365" y2="285" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1E2927" />
                        <stop offset="100%" stopColor="#0E1514" />
                      </linearGradient>

                      {/* Retinal Fundus Sphere Gradient */}
                      <radialGradient id="suiteFundusGrad" cx="46%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D9583B" />
                        <stop offset="64%" stopColor="#942815" />
                        <stop offset="92%" stopColor="#4F1209" />
                        <stop offset="100%" stopColor="#2A0804" />
                      </radialGradient>

                      {/* Grad-CAM Thermal Biomarker Overlay */}
                      <radialGradient id="suiteGradCamHot" cx="63%" cy="41%" r="34%">
                        <stop offset="0%" stopColor="#FF2E00" stopOpacity="0.92" />
                        <stop offset="42%" stopColor="#FACC15" stopOpacity="0.72" />
                        <stop offset="76%" stopColor="#22C55E" stopOpacity="0.34" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </radialGradient>

                      {/* Secondary Subtle Optic Disc Activation */}
                      <radialGradient id="suiteGradCamDisc" cx="35%" cy="50%" r="24%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
                        <stop offset="65%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </radialGradient>

                      {/* Brushed Titanium / Warm Alabaster Housing for Fundus Camera */}
                      <linearGradient id="cameraBodyGrad" x1="58" y1="215" x2="188" y2="355" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F7F5F0" />
                        <stop offset="55%" stopColor="#E4E0D8" />
                        <stop offset="100%" stopColor="#C4BEB3" />
                      </linearGradient>

                      {/* Optical Objective Lens Glass Reflection */}
                      <radialGradient id="opticalLensGrad" cx="42%" cy="38%" r="55%">
                        <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.75" />
                        <stop offset="38%" stopColor="#3B666B" stopOpacity="0.9" />
                        <stop offset="78%" stopColor="#16282A" />
                        <stop offset="100%" stopColor="#091112" />
                      </radialGradient>

                      {/* Clinical Examination Table Surface */}
                      <linearGradient id="deskSurfaceGrad" x1="215" y1="362" x2="215" y2="430" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#D7CFC2" />
                        <stop offset="35%" stopColor="#B8AE9E" />
                        <stop offset="100%" stopColor="#8C8273" />
                      </linearGradient>
                    </defs>

                    {/* 1. Architectural Suite Backdrop & Soft Lighting */}
                    <rect width="430" height="510" fill="url(#suiteWallGrad)" />
                    <rect width="430" height="510" fill="url(#ceilingHalo)" />

                    {/* Subtle Architectural Vertical Fluting in Background */}
                    <g opacity="0.14" stroke="#F9F8F6" strokeWidth="1">
                      <line x1="86" y1="30" x2="86" y2="375" />
                      <line x1="128" y1="15" x2="128" y2="375" />
                      <line x1="302" y1="15" x2="302" y2="375" />
                      <line x1="344" y1="30" x2="344" y2="375" />
                    </g>

                    {/* Top Clinical Suite Header Pill inside Arch */}
                    <g transform="translate(116, 48)">
                      <rect
                        x="0"
                        y="0"
                        width="198"
                        height="26"
                        rx="13"
                        fill="#192220"
                        fillOpacity="0.78"
                        stroke="#B58E49"
                        strokeOpacity="0.45"
                        strokeWidth="1"
                      />
                      <circle cx="16" cy="13" r="3.5" fill="#34D399" />
                      <text
                        x="27"
                        y="16.5"
                        fill="#F3D8A4"
                        fontSize="9.5"
                        fontWeight="700"
                        letterSpacing="1.6"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        RETINAL SUITE • XAI LIVE
                      </text>
                    </g>

                    {/* 2. High-Resolution Calibrated Clinical Diagnostic Display (Right-Center) */}
                    <g>
                      {/* Articulated VESA Monitor Arm */}
                      <path
                        d="M276 286V334C276 346 288 354 302 354H324"
                        stroke="#141C1A"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />
                      <path
                        d="M276 286V334C276 346 288 354 302 354H324"
                        stroke="#495B56"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Monitor Base Plate */}
                      <rect x="252" y="355" width="92" height="8" rx="4" fill="#2A3633" />

                      {/* Outer Bezel */}
                      <rect
                        x="154"
                        y="102"
                        width="226"
                        height="184"
                        rx="14"
                        fill="url(#monitorBezelGrad)"
                        stroke="#5D7E7B"
                        strokeOpacity="0.55"
                        strokeWidth="1.5"
                      />
                      {/* Inner Active Screen */}
                      <rect x="163" y="111" width="208" height="162" rx="9" fill="#0B1211" />

                      {/* Screen Top Telemetry Header */}
                      <rect x="163" y="111" width="208" height="22" rx="6" fill="#131E1C" />
                      <text
                        x="173"
                        y="125"
                        fill="#A3B5B0"
                        fontSize="7.5"
                        fontWeight="600"
                        letterSpacing="1"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        OD • FUNDUS 45° • GRAD-CAM
                      </text>
                      <rect x="319" y="116" width="44" height="12" rx="6" fill="#B58E49" fillOpacity="0.25" />
                      <text
                        x="325"
                        y="124.5"
                        fill="#F3D8A4"
                        fontSize="7"
                        fontWeight="700"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        96.4% AI
                      </text>

                      {/* Detailed Retinal Fundus Scan inside Clinical Monitor */}
                      <g transform="translate(232, 199)">
                        {/* Outer Retinal Field */}
                        <circle cx="0" cy="0" r="54" fill="url(#suiteFundusGrad)" />

                        {/* Subtle Choroidal Vignette Ring */}
                        <circle
                          cx="0"
                          cy="0"
                          r="53"
                          stroke="#1F0603"
                          strokeWidth="2.5"
                        />

                        {/* Macula / Fovea Dark Region */}
                        <circle cx="14" cy="2" r="13" fill="#4A0F07" fillOpacity="0.58" />
                        <circle cx="14" cy="2" r="3" fill="#2B0703" fillOpacity="0.7" />

                        {/* Optic Disc (Nasal Side) & Physiological Cup */}
                        <circle cx="-21" cy="0" r="10.5" fill="#FDE68A" fillOpacity="0.92" />
                        <circle cx="-21" cy="0" r="7.5" fill="#FBBF24" fillOpacity="0.45" />
                        <circle cx="-20.5" cy="0" r="3.8" fill="#FFFBEB" />

                        {/* Superior & Inferior Retinal Vascular Arcades */}
                        <path
                          d="M-21 -2C-12 -22 6 -30 32 -20"
                          stroke="#590B07"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M-21 -1C-6 -14 12 -16 38 -8"
                          stroke="#6B100A"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M-21 2C-11 23 8 31 34 21"
                          stroke="#590B07"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M-21 1C-5 15 14 17 39 9"
                          stroke="#6B100A"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                        {/* Nasal Vessel Branches */}
                        <path
                          d="M-22 -2C-30 -16 -38 -24 -44 -28"
                          stroke="#6B100A"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M-22 2C-30 16 -38 24 -44 28"
                          stroke="#6B100A"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        {/* Fine Macular Arterioles */}
                        <path
                          d="M-2 -18C4 -10 9 -6 13 -3"
                          stroke="#75130C"
                          strokeWidth="0.95"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 19C6 11 10 7 13 4"
                          stroke="#75130C"
                          strokeWidth="0.95"
                          strokeLinecap="round"
                        />

                        {/* Microaneurysm & Exudate Biomarkers */}
                        <circle cx="11" cy="-12" r="1.8" fill="#450404" />
                        <circle cx="21" cy="-7" r="1.5" fill="#450404" />
                        <circle cx="17" cy="12" r="1.9" fill="#450404" />
                        <circle cx="25" cy="4" r="1.4" fill="#FDE047" />

                        {/* Grad-CAM Thermal Overlay on Fundus */}
                        <circle cx="0" cy="0" r="54" fill="url(#suiteGradCamHot)" />
                        <circle cx="0" cy="0" r="54" fill="url(#suiteGradCamDisc)" />

                        {/* Precision XAI Reticle Ring around Detected Lesion */}
                        <circle
                          cx="14"
                          cy="-9"
                          r="12"
                          stroke="#FCD34D"
                          strokeWidth="1.2"
                          strokeDasharray="2.5 2.5"
                        />
                      </g>

                      {/* Right-Side Biometric Telemetry Readout inside Monitor */}
                      <g transform="translate(298, 146)">
                        <rect x="0" y="0" width="64" height="32" rx="5" fill="#14201E" stroke="#3B666B" strokeOpacity="0.4" />
                        <text x="7" y="12" fill="#8FA6A1" fontSize="6.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                          STAGE
                        </text>
                        <text x="7" y="24" fill="#F9F8F6" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                          Mod. NPDR
                        </text>

                        <rect x="0" y="38" width="64" height="32" rx="5" fill="#14201E" stroke="#3B666B" strokeOpacity="0.4" />
                        <text x="7" y="50" fill="#8FA6A1" fontSize="6.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                          CDR RATIO
                        </text>
                        <text x="7" y="62" fill="#34D399" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                          0.34 (Norm)
                        </text>

                        <rect x="0" y="76" width="64" height="32" rx="5" fill="#14201E" stroke="#B58E49" strokeOpacity="0.45" />
                        <text x="7" y="88" fill="#8FA6A1" fontSize="6.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                          LATENCY
                        </text>
                        <text x="7" y="100" fill="#F3D8A4" fontSize="8.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                          42 ms • B3
                        </text>
                      </g>

                      {/* Monitor Chin Bezel LED Indicator */}
                      <circle cx="267" cy="279" r="2" fill="#34D399" />
                    </g>

                    {/* 3. Sleek Non-Mydriatic Retinal Fundus Camera Workstation (Foreground Left) */}
                    <g>
                      {/* Workstation Pedestal Column & Sliding XY Stage Base */}
                      <rect x="64" y="346" width="114" height="16" rx="6" fill="#2A3633" />
                      <rect x="76" y="336" width="90" height="12" rx="4" fill="#465652" />
                      <rect x="104" y="302" width="34" height="36" rx="4" fill="#9E978B" />

                      {/* Ergonomic Patient Chin-Rest & Forehead Frame (Left Side of Camera) */}
                      <path
                        d="M52 204C52 195 59 189 68 189H84"
                        stroke="#C8C1B6"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      {/* Forehead Rest Pad */}
                      <rect x="46" y="198" width="12" height="24" rx="5" fill="#3B666B" />
                      {/* Vertical Chin-Rest Pillar */}
                      <line x1="56" y1="216" x2="56" y2="346" stroke="#B5AEA2" strokeWidth="4" />
                      {/* Contoured Chin Cup */}
                      <path
                        d="M46 296C46 303 66 303 66 296"
                        stroke="#3B666B"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />

                      {/* Main Contoured Fundus Camera Housing */}
                      <path
                        d="M84 218C84 205 95 196 108 196H156C172 196 184 208 184 224V286C184 298 174 308 162 308H104C93 308 84 299 84 288V218Z"
                        fill="url(#cameraBodyGrad)"
                        stroke="#FFFFFF"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                      />

                      {/* Gold Clinical Accent Stripe along Camera Housing */}
                      <path
                        d="M92 222H176"
                        stroke="#B58E49"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Multi-Element Optical Objective Barrel (Facing Left toward Patient Chin-Rest) */}
                      <rect x="66" y="226" width="22" height="44" rx="5" fill="#2E3B38" />
                      <rect x="60" y="231" width="8" height="34" rx="3" fill="#B58E49" />
                      {/* Optical Coated Glass Lens */}
                      <ellipse cx="60" cy="248" rx="4.5" ry="15" fill="url(#opticalLensGrad)" />
                      <ellipse cx="59" cy="243" rx="1.5" ry="5" fill="#FFFFFF" fillOpacity="0.65" />

                      {/* Clinician Operator Touch-Control Screen on Back of Camera */}
                      <rect
                        x="126"
                        y="234"
                        width="50"
                        height="38"
                        rx="6"
                        fill="#15201E"
                        stroke="#3B666B"
                        strokeWidth="1.5"
                      />
                      {/* Mini Alignment Crosshair on Camera Operator Display */}
                      <circle cx="151" cy="253" r="10" stroke="#34D399" strokeWidth="1.2" strokeDasharray="2 2" />
                      <circle cx="151" cy="253" r="3" fill="#B58E49" />

                      {/* Precision Alignment Joystick */}
                      <path d="M121 336V316" stroke="#2B3A38" strokeWidth="4.5" strokeLinecap="round" />
                      <circle cx="121" cy="313" r="6.5" fill="#3B666B" />
                      <circle cx="119" cy="311" r="2" fill="#A3B5B0" />
                    </g>

                    {/* 4. Warm Medical Examination Desk Surface */}
                    <rect x="0" y="362" width="430" height="58" fill="url(#deskSurfaceGrad)" />
                    <line x1="0" y1="362" x2="430" y2="362" stroke="#F9F8F6" strokeOpacity="0.55" strokeWidth="1.5" />
                  </svg>

                  {/* Top Subtle Vignette for Arch Depth */}
                  <div className="relative z-10 h-10 pointer-events-none" />

                  {/* Bottom Arch Clinical Telemetry Bar */}
                  <div className="relative z-10 mx-5 mb-0 bg-[#F9F8F6] rounded-t-2xl p-5 shadow-lg border-t-4 border-[#B58E49]">
                    <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[#2B3A38]/15">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#3B666B]">
                          Grad-CAM
                        </p>
                        <p className="font-editorial text-lg font-bold text-[#2B3A38] mt-0.5">
                          Lesion Focus
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#3B666B]">
                          SHAP Maps
                        </p>
                        <p className="font-editorial text-lg font-bold text-[#2B3A38] mt-0.5">
                          Pixel Attribution
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#3B666B]">
                          Benchmarks
                        </p>
                        <p className="font-editorial text-lg font-bold text-[#2B3A38] mt-0.5">
                          3 Deep Models
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower-Right Overlapping Slate-Teal Botanical Leaf Cluster (#3B666B) */}
                <svg
                  viewBox="0 0 95 95"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 sm:w-20 sm:h-20 absolute -bottom-2 -right-1 z-20 pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Center tall teal petal */}
                  <path
                    d="M48 12C38 26 38 44 48 58C58 44 58 26 48 12Z"
                    fill="#3B666B"
                  />
                  {/* Left angled teal petal */}
                  <path
                    d="M14 40C28 38 41 47 45 61C31 63 18 54 14 40Z"
                    fill="#4A7478"
                  />
                  {/* Right angled teal petal */}
                  <path
                    d="M82 38C68 37 56 46 52 60C66 61 78 52 82 38Z"
                    fill="#3B666B"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE INTERACTIVE CLINICAL SCREENING & XAI DIAGNOSTIC WORKSPACE */}
      <section
        ref={workspaceRef}
        className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#2B3A38]/8"
      >
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#3B666B]">
            Interactive Clinical Workspace
          </p>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#2B3A38] mt-2 font-medium">
            Retinal Screening &amp; <span className="italic text-[#3B666B]">Explainable AI</span> Analysis
          </h2>
          <p className="text-sm sm:text-base text-[#2B3A38]/75 mt-3">
            Select a clinical fundus case or upload a retinal scan to inspect severity staging, model confidence, and interactive Grad-CAM / SHAP visual explanations.
          </p>
        </div>

        {/* Workspace Main Grid: Left Intake & Sample Selector | Right XAI Viewer & Diagnostic Report */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL (4 Cols): Patient Intake, Sample Cases & Model Selector */}
          <div className="lg:col-span-4 space-y-6">
            {/* Step 1: Select Clinical Preset or Upload Scan */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#2B3A38]/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#3B666B]">
                  01. Retinal Fundus Input
                </span>
                <Eye className="w-4 h-4 text-[#B58E49]" />
              </div>

              {/* Sample Clinical Presets */}
              <label className="block text-xs font-semibold text-[#2B3A38]/70 uppercase tracking-wider mb-2.5">
                Clinical Test Cases (Instant Demo)
              </label>
              <div className="space-y-2.5">
                {SAMPLE_CASES.map((preset) => {
                  const isSelected = preset.id === selectedCaseId && !uploadedImageUrl;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetClick(preset)}
                      className={`w-full text-left px-4 py-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#3B666B] text-white border-[#3B666B] shadow-sm'
                          : 'bg-[#F9F8F6] hover:bg-[#F1EFEA] text-[#2B3A38] border-[#2B3A38]/10'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">{preset.label}</p>
                        <p
                          className={`text-xs mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-[#2B3A38]/60'
                          }`}
                        >
                          {preset.patientId} • {preset.eye}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isSelected ? 'text-[#F3D8A4]' : 'text-[#2B3A38]/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Custom Image Upload Dropzone */}
              <div className="mt-4 pt-4 border-t border-[#2B3A38]/10">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-[#3B666B]/35 hover:border-[#3B666B] bg-[#F9F8F6]/70 hover:bg-[#3B666B]/5 transition-colors flex items-center justify-center space-x-2 text-sm font-medium text-[#3B666B] cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {uploadedImageUrl ? 'Replace Custom Fundus Image' : 'Upload Custom Fundus Image'}
                  </span>
                </button>
              </div>
            </div>

            {/* Step 2: Patient Metadata & AI Architecture Selector */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#2B3A38]/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#3B666B]">
                  02. Screening Parameters
                </span>
                <Sliders className="w-4 h-4 text-[#B58E49]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2B3A38]/65 mb-1">
                    Patient ID
                  </label>
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#2B3A38]/15 text-sm font-medium focus:outline-none focus:border-[#3B666B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2B3A38]/65 mb-1">
                    Age (Yrs)
                  </label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#2B3A38]/15 text-sm font-medium focus:outline-none focus:border-[#3B666B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2B3A38]/65 mb-1">
                  Laterality (Eye)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['OD (Right Eye)', 'OS (Left Eye)'].map((eyeOption) => (
                    <button
                      key={eyeOption}
                      type="button"
                      onClick={() => setSelectedEye(eyeOption)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedEye === eyeOption
                          ? 'bg-[#2B3A38] text-white border-[#2B3A38]'
                          : 'bg-[#F9F8F6] text-[#2B3A38]/80 border-[#2B3A38]/15'
                      }`}
                    >
                      {eyeOption}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2B3A38]/65 mb-1">
                  Active Deep Learning Model
                </label>
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#2B3A38]/15 text-sm font-medium focus:outline-none focus:border-[#3B666B]"
                >
                  {MODEL_BENCHMARKS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.inferenceMs}ms)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => runSimulatedScreening(selectedCaseId, uploadedImageUrl)}
                disabled={isAnalyzing}
                className="w-full bg-[#B58E49] hover:bg-[#9E7A3B] disabled:opacity-60 text-white text-xs font-bold tracking-[0.14em] uppercase py-3.5 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'Analyzing Retina...' : 'Re-Run AI Inference'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT PANEL (8 Cols): Diagnostic Output & Interactive XAI Heatmap Studio */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B3A38]/10 relative overflow-hidden">
            {/* Simulated Inference Loading Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 z-30 bg-[#F9F8F6]/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full border-4 border-[#3B666B]/20 border-t-[#3B666B] animate-spin mb-4" />
                <p className="font-editorial text-2xl text-[#2B3A38] font-semibold">
                  Processing Retinal Biomarkers
                </p>
                <p className="text-sm text-[#3B666B] mt-1.5 font-medium">{analysisStep}</p>
              </div>
            )}

            {/* Top Diagnostic Summary Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#2B3A38]/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#3B666B]">
                    03. Diagnostic &amp; XAI Report
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F9F8F6] border border-[#2B3A38]/15 text-[#2B3A38]/75 font-medium">
                    {patientId} • Age {patientAge} • {selectedEye}
                  </span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl text-[#2B3A38] mt-2 font-semibold">
                  {activeCase.condition}
                </h3>
              </div>

              {/* Severity Stage Badge */}
              <div className="flex flex-col items-end">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-1.5 ${
                    activeCase.severityLevel === 'normal'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : activeCase.severityLevel === 'moderate'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {activeCase.severityLevel === 'normal' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  )}
                  <span>{activeCase.severity}</span>
                </span>
                <span className="text-xs text-[#2B3A38]/60 mt-1.5">
                  Model: <strong className="text-[#2B3A38]">{activeModel.name}</strong> ({activeModel.inferenceMs} ms)
                </span>
              </div>
            </div>

            {/* Interactive XAI Canvas + Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-7 pt-6 items-start">
              {/* Retinal Canvas & Interactive Controls (7 Cols) */}
              <div className="md:col-span-7 space-y-4">
                {/* XAI Mode Switcher Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#F9F8F6] border border-[#2B3A38]/10">
                  {[
                    { id: 'original', label: 'Original Scan' },
                    { id: 'gradcam', label: 'Grad-CAM' },
                    { id: 'shap', label: 'SHAP Map' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setXaiMode(tab.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        xaiMode === tab.id
                          ? 'bg-[#3B666B] text-white shadow-sm'
                          : 'text-[#2B3A38]/75 hover:text-[#2B3A38]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Canvas Display */}
                <RetinalXaiCanvas
                  caseData={activeCase}
                  uploadedImageUrl={uploadedImageUrl}
                  xaiMode={xaiMode}
                  opacity={heatmapOpacity}
                  zoom={zoomLevel}
                  showAnnotations={showAnnotations}
                />

                {/* Opacity Slider & Zoom Controls */}
                <div className="bg-[#F9F8F6] rounded-2xl p-4 border border-[#2B3A38]/10 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-semibold text-[#2B3A38] flex items-center">
                      <Layers className="w-3.5 h-3.5 mr-1.5 text-[#3B666B]" />
                      Heatmap Opacity
                    </label>
                    <span className="text-xs font-bold text-[#3B666B]">{heatmapOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={heatmapOpacity}
                    disabled={xaiMode === 'original'}
                    onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                    className="w-full accent-[#3B666B] cursor-pointer disabled:opacity-40"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2B3A38]/10">
                    {/* Biomarker Callout Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowAnnotations(!showAnnotations)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        showAnnotations
                          ? 'bg-[#B58E49]/15 border-[#B58E49] text-[#2B3A38]'
                          : 'bg-white border-[#2B3A38]/15 text-[#2B3A38]/70'
                      }`}
                    >
                      {showAnnotations ? '✓ Biomarker Rings On' : 'Biomarker Rings Off'}
                    </button>

                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setZoomLevel((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                        aria-label="Zoom out"
                        className="p-1.5 rounded-lg bg-white border border-[#2B3A38]/15 hover:bg-[#3B666B] hover:text-white transition-colors cursor-pointer"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoomLevel((z) => Math.min(2, +(z + 0.25).toFixed(2)))}
                        aria-label="Zoom in"
                        className="p-1.5 rounded-lg bg-white border border-[#2B3A38]/15 hover:bg-[#3B666B] hover:text-white transition-colors cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoomLevel(1)}
                        aria-label="Reset zoom"
                        className="p-1.5 rounded-lg bg-white border border-[#2B3A38]/15 hover:bg-[#3B666B] hover:text-white transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Clinical Interpretability & Probability Breakdown (5 Cols) */}
              <div className="md:col-span-5 space-y-5">
                {/* Model Confidence & Stage Distribution */}
                <div className="bg-[#F9F8F6] rounded-2xl p-4 border border-[#2B3A38]/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3B666B]">
                      Prediction Confidence
                    </span>
                    <span className="font-editorial text-2xl font-bold text-[#2B3A38]">
                      {activeCase.confidence}%
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeCase.probabilities.map((item) => (
                      <div key={item.stage}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-[#2B3A38]/85">{item.stage}</span>
                          <span className="font-semibold text-[#2B3A38]">{item.value}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#2B3A38]/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#3B666B] transition-all duration-500"
                            style={{ width: `${Math.max(item.value, 2)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* XAI Visual Findings List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B666B] mb-2.5 flex items-center">
                    <Microscope className="w-3.5 h-3.5 mr-1.5 text-[#B58E49]" />
                    Explainable AI Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {activeCase.clinicalFindings.map((finding, index) => (
                      <li
                        key={index}
                        className="text-xs leading-relaxed text-[#2B3A38]/85 bg-[#F9F8F6] p-3 rounded-xl border border-[#2B3A38]/8 flex items-start space-x-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#B58E49] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinical Next-Step Guidance */}
                <div className="p-4 rounded-2xl bg-[#3B666B]/8 border border-[#3B666B]/20">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#3B666B] mb-1">
                    Clinical Decision Support Note
                  </p>
                  <p className="text-xs leading-relaxed text-[#2B3A38]/90">
                    {activeCase.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RESEARCH & COMPARATIVE DEEP LEARNING ANALYSIS (ResNet-50 vs EfficientNet vs ViT) */}
      <section
        ref={benchmarksRef}
        className="py-16 sm:py-24 bg-[#F1EFEA]/80 border-y border-[#2B3A38]/10 px-4 sm:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#3B666B]">
                Research &amp; Comparative Benchmark
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#2B3A38] mt-2 font-medium">
                Multi-Model <span className="italic text-[#3B666B]">Deep Learning</span> Evaluation
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All 5 Metrics' },
                { id: 'clinical', label: 'Diagnostic Accuracy' },
                { id: 'efficiency', label: 'Hospital Deployment Speed' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveMetricView(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeMetricView === filter.id
                      ? 'bg-[#3B666B] text-white'
                      : 'bg-white text-[#2B3A38]/80 border border-[#2B3A38]/15 hover:border-[#3B666B]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {MODEL_BENCHMARKS.map((model) => {
              const isCurrentModel = model.id === selectedModelId;
              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={`rounded-3xl p-6 sm:p-7 transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrentModel
                      ? 'bg-[#2B3A38] text-white shadow-xl ring-2 ring-[#B58E49]'
                      : 'bg-white text-[#2B3A38] border border-[#2B3A38]/10 hover:border-[#3B666B]/40 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isCurrentModel
                            ? 'bg-[#B58E49] text-white'
                            : 'bg-[#3B666B]/10 text-[#3B666B]'
                        }`}
                      >
                        {model.badge}
                      </span>
                      {isCurrentModel && (
                        <span className="text-[11px] uppercase tracking-wider text-[#F3D8A4] font-semibold">
                          Active
                        </span>
                      )}
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold">
                      {model.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentModel ? 'text-white/70' : 'text-[#2B3A38]/65'
                      }`}
                    >
                      {model.architecture}
                    </p>

                    <p
                      className={`text-xs leading-relaxed mt-4 ${
                        isCurrentModel ? 'text-white/85' : 'text-[#2B3A38]/80'
                      }`}
                    >
                      {model.summary}
                    </p>
                  </div>

                  {/* 5 Metrics Grid inside each Model Card */}
                  <div
                    className={`mt-6 pt-5 border-t grid grid-cols-3 gap-3 ${
                      isCurrentModel ? 'border-white/15' : 'border-[#2B3A38]/10'
                    }`}
                  >
                    {(activeMetricView === 'all' || activeMetricView === 'clinical') && (
                      <>
                        <div>
                          <p
                            className={`text-[10px] uppercase tracking-wider ${
                              isCurrentModel ? 'text-white/65' : 'text-[#2B3A38]/60'
                            }`}
                          >
                            Accuracy
                          </p>
                          <p className="text-base font-bold mt-0.5">{model.accuracy}%</p>
                        </div>
                        <div>
                          <p
                            className={`text-[10px] uppercase tracking-wider ${
                              isCurrentModel ? 'text-white/65' : 'text-[#2B3A38]/60'
                            }`}
                          >
                            Sensitivity
                          </p>
                          <p className="text-base font-bold mt-0.5">{model.sensitivity}%</p>
                        </div>
                        <div>
                          <p
                            className={`text-[10px] uppercase tracking-wider ${
                              isCurrentModel ? 'text-white/65' : 'text-[#2B3A38]/60'
                            }`}
                          >
                            Specificity
                          </p>
                          <p className="text-base font-bold mt-0.5">{model.specificity}%</p>
                        </div>
                      </>
                    )}

                    {(activeMetricView === 'all' || activeMetricView === 'efficiency') && (
                      <>
                        <div>
                          <p
                            className={`text-[10px] uppercase tracking-wider ${
                              isCurrentModel ? 'text-white/65' : 'text-[#2B3A38]/60'
                            }`}
                          >
                            Latency
                          </p>
                          <p className="text-base font-bold mt-0.5 text-[#B58E49]">
                            {model.inferenceMs} ms
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-[10px] uppercase tracking-wider ${
                              isCurrentModel ? 'text-white/65' : 'text-[#2B3A38]/60'
                            }`}
                          >
                            Memory
                          </p>
                          <p className="text-base font-bold mt-0.5">{model.memoryMb} MB</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Comparative Bar Matrix Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B3A38]/10 overflow-x-auto">
            <h3 className="font-editorial text-2xl text-[#2B3A38] font-semibold mb-5">
              Scientific Performance Matrix (Real-Time Screening Readiness)
            </h3>
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#2B3A38]/15 text-[11px] font-bold uppercase tracking-wider text-[#3B666B]">
                  <th className="py-3 pr-4">Model Architecture</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Sensitivity (Recall)</th>
                  <th className="py-3 px-4">Specificity</th>
                  <th className="py-3 px-4">Inference Time</th>
                  <th className="py-3 pl-4">Memory Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B3A38]/10 text-sm">
                {MODEL_BENCHMARKS.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-4 pr-4 font-semibold text-[#2B3A38]">{m.name}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 rounded-full bg-[#2B3A38]/10 overflow-hidden">
                          <div
                            className="h-full bg-[#3B666B]"
                            style={{ width: `${m.accuracy}%` }}
                          />
                        </div>
                        <span className="font-semibold">{m.accuracy}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">{m.sensitivity}%</td>
                    <td className="py-4 px-4 font-medium">{m.specificity}%</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58E49]/15 text-[#2B3A38]">
                        <Clock className="w-3 h-3 mr-1 text-[#B58E49]" />
                        {m.inferenceMs} ms
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <span className="inline-flex items-center text-xs font-medium text-[#2B3A38]/80">
                        <HardDrive className="w-3.5 h-3.5 mr-1.5 text-[#3B666B]" />
                        {m.memoryMb} MB
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM ARCHITECTURE & CLINICAL FOOTER */}
      <footer className="bg-[#2B3A38] text-white pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            <div className="md:col-span-5">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-xl">
                  <OcularisEmblem className="w-9 h-9" />
                </div>
                <div>
                  <span className="font-editorial text-2xl tracking-[0.18em] uppercase font-semibold block">
                    OcuLens
                  </span>
                  <span className="font-editorial text-xs tracking-[0.26em] uppercase text-[#E6C587] block">
                    Retinal AI System
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/75 leading-relaxed mt-4 max-w-md">
                An explainable, multi-disease ophthalmic screening platform engineered with React.js, Python Deep Learning pipelines, Grad-CAM/SHAP interpretability, and multi-architecture benchmarking.
              </p>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#E6C587] mb-3">
                3-Phase Development Roadmap
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#B58E49]" />
                  <span>Phase 1: Editorial UI &amp; XAI Diagnostic Frontend (Active)</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="w-3.5 h-3.5 mr-2 text-white/50" />
                  <span>Phase 2: Python FastAPI + PyTorch Grad-CAM/SHAP Engine</span>
                </li>
                <li className="flex items-center">
                  <Activity className="w-3.5 h-3.5 mr-2 text-white/50" />
                  <span>Phase 3: Clinical Validation &amp; Cloud Deployment</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#E6C587] mb-3">
                Clinical Disclaimer
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                This software is intended solely for clinical screening and decision support. All automated predictions and heatmaps must be verified by a qualified ophthalmologist.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
            <p>© 2026 OcuLens Retinal AI — AI-Based Eye Disease Screening System.</p>
            <p>Built for Transparent Clinical Trust &amp; Comparative Deep Learning Research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}