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
  FileText,
  Sliders,
  Info,
  ArrowRight,
  Microscope
} from 'lucide-react';

/**
 * SAMPLE RETINAL CASES (Mock Clinical Dataset)
 * Includes realistic fundus anatomical coordinates, pathology markers,
 * Grad-CAM hotspot regions, SHAP pixel clusters, and multi-model metrics.
 */
const SAMPLE_CASES = [
  {
    id: 'dr-moderate',
    label: 'Diabetic Retinopathy (Moderate)',
    patientId: 'PT-2026-104',
    age: 58,
    eye: 'OD (Right Eye)',
    condition: 'Diabetic Retinopathy',
    severity: 'Moderate NPDR (Stage 2)',
    severityLevel: 'moderate', // 'normal' | 'moderate' | 'severe'
    confidence: 96.4,
    probabilities: [
      { stage: 'No DR (Healthy)', value: 1.4 },
      { stage: 'Mild NPDR', value: 2.2 },
      { stage: 'Moderate NPDR', value: 96.4 },
      { stage: 'Severe / Proliferative', value: 0.0 }
    ],
    fundusStyle: {
      baseHue: '#b83c24',
      edgeHue: '#4a140c',
      discCupRatio: 0.34,
      lesions: [
        { x: 185, y: 120, r: 6, type: 'hemorrhage', label: 'Dot Hemorrhage' },
        { x: 245, y: 155, r: 5, type: 'microaneurysm', label: 'Microaneurysm' },
        { x: 210, y: 235, r: 7, type: 'hemorrhage', label: 'Blot Hemorrhage' },
        { x: 275, y: 205, r: 5, type: 'exudate', label: 'Hard Exudate' },
        { x: 260, y: 115, r: 4, type: 'microaneurysm', label: 'Microaneurysm' }
      ],
      gradCamHotspots: [
        { x: 195, y: 125, r: 58, intensity: 0.92 },
        { x: 265, y: 185, r: 65, intensity: 0.88 },
        { x: 210, y: 235, r: 50, intensity: 0.78 }
      ],
      shapPoints: [
        { x: 185, y: 120, weight: 0.95 },
        { x: 189, y: 123, weight: 0.85 },
        { x: 245, y: 155, weight: 0.91 },
        { x: 210, y: 235, weight: 0.94 },
        { x: 275, y: 205, weight: 0.89 },
        { x: 260, y: 115, weight: 0.82 },
        { x: 205, y: 230, weight: 0.76 }
      ]
    },
    clinicalFindings: [
      'Multiple retinal microaneurysms and dot-blot hemorrhages localized in the temporal macular arcade.',
      'Localized hard exudate cluster superior-temporal to the fovea.',
      'Optic disc margins remain sharp with physiological cup-to-disc ratio (0.34).'
    ],
    recommendation: 'Refer to ophthalmologist within 4–6 weeks for dilated fundus examination and glycemic control review.'
  },
  {
    id: 'glaucoma-suspect',
    label: 'Glaucoma (Optic Neuropathy)',
    patientId: 'PT-2026-219',
    age: 66,
    eye: 'OS (Left Eye)',
    condition: 'Primary Open-Angle Glaucoma',
    severity: 'High-Risk Cupping (Stage 3)',
    severityLevel: 'severe',
    confidence: 94.8,
    probabilities: [
      { stage: 'Healthy Optic Nerve', value: 1.8 },
      { stage: 'Glaucoma Suspect', value: 3.4 },
      { stage: 'Confirmed Glaucoma', value: 94.8 }
    ],
    fundusStyle: {
      baseHue: '#c24929',
      edgeHue: '#4d180d',
      discCupRatio: 0.76, // Enlarged optic cup hallmark of glaucoma
      lesions: [
        { x: 112, y: 175, r: 16, type: 'cupping', label: 'Enlarged Optic Cup (CDR 0.76)' },
        { x: 115, y: 142, r: 6, type: 'rim-thinning', label: 'Superior Neuroretinal Rim Thinning' }
      ],
      gradCamHotspots: [
        { x: 112, y: 175, r: 72, intensity: 0.96 },
        { x: 118, y: 145, r: 44, intensity: 0.82 }
      ],
      shapPoints: [
        { x: 112, y: 175, weight: 0.98 },
        { x: 106, y: 168, weight: 0.92 },
        { x: 118, y: 182, weight: 0.91 },
        { x: 114, y: 152, weight: 0.88 },
        { x: 112, y: 196, weight: 0.87 }
      ]
    },
    clinicalFindings: [
      'Marked vertical enlargement of the optic cup (Cup-to-Disc Ratio ≈ 0.76) with focal neuroretinal rim thinning.',
      'Nasalization of central retinal vessel trunks emerging from the optic nerve head.',
      'Macular region appears free of diabetic exudates or intraretinal hemorrhages.'
    ],
    recommendation: 'Urgent glaucoma specialist referral for intraocular pressure (IOP) tonometry, OCT RNFL scan, and visual field perimetry.'
  },
  {
    id: 'healthy-retina',
    label: 'Healthy Normal Retina',
    patientId: 'PT-2026-073',
    age: 41,
    eye: 'OD (Right Eye)',
    condition: 'No Ocular Pathology Detected',
    severity: 'Normal Fundus (Stage 0)',
    severityLevel: 'normal',
    confidence: 98.7,
    probabilities: [
      { stage: 'Healthy Retina', value: 98.7 },
      { stage: 'Diabetic Retinopathy', value: 0.8 },
      { stage: 'Glaucoma', value: 0.5 }
    ],
    fundusStyle: {
      baseHue: '#c44527',
      edgeHue: '#54190d',
      discCupRatio: 0.28,
      lesions: [],
      gradCamHotspots: [
        { x: 112, y: 175, r: 48, intensity: 0.48 },
        { x: 225, y: 175, r: 52, intensity: 0.45 }
      ],
      shapPoints: [
        { x: 112, y: 175, weight: 0.52 },
        { x: 225, y: 175, weight: 0.49 },
        { x: 175, y: 140, weight: 0.41 }
      ]
    },
    clinicalFindings: [
      'Well-defined optic nerve head with healthy pink neuroretinal rim and normal cup-to-disc ratio (0.28).',
      'Uniform macular reflex and intact retinal arterioles and venules without tortuosity.',
      'No microaneurysms, hemorrhages, or exudates identified across all four retinal quadrants.'
    ],
    recommendation: 'Routine annual ophthalmic screening recommended. No immediate clinical intervention required.'
  }
];

/**
 * COMPARATIVE DEEP LEARNING MODEL BENCHMARKS
 * Mirrors the 3 architectures and 5 evaluation metrics from the project specification.
 */
const MODEL_BENCHMARKS = [
  {
    id: 'efficientnet',
    name: 'EfficientNet-B3',
    architecture: 'Compound-Scaled CNN',
    badge: 'Recommended Clinical Balance',
    accuracy: 96.4,
    sensitivity: 95.8,
    specificity: 97.1,
    inferenceMs: 42,
    memoryMb: 48,
    summary:
      'Achieves optimal trade-off between diagnostic sensitivity and low latency, making it ideal for real-time web and clinical deployment.'
  },
  {
    id: 'vit',
    name: 'Vision Transformer (ViT-B/16)',
    architecture: 'Self-Attention Patch Transformer',
    badge: 'Highest Global Context Accuracy',
    accuracy: 97.1,
    sensitivity: 96.6,
    specificity: 97.5,
    inferenceMs: 118,
    memoryMb: 330,
    summary:
      'Captures long-range spatial relationships across the optic disc and macula simultaneously, yielding peak accuracy at higher compute cost.'
  },
  {
    id: 'resnet50',
    name: 'CNN – ResNet-50',
    architecture: 'Deep Residual Convolutional Network',
    badge: 'Reliable Baseline Architecture',
    accuracy: 93.8,
    sensitivity: 92.4,
    specificity: 94.9,
    inferenceMs: 56,
    memoryMb: 98,
    summary:
      'Strong feature extraction baseline for localized retinal lesions, though slightly lower sensitivity on subtle early-stage microaneurysms.'
  }
];

/**
 * CUSTOM BRAND EMBLEM SVG
 * Inspired by the botanical/caduceus line-art emblem in the reference header,
 * blending organic ophthalmic/retinal symmetry with editorial fine-line craftsmanship.
 */
const OcularisEmblem = ({ className = 'w-11 h-11' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central Vertical Axis */}
    <path
      d="M32 8V56"
      stroke="#3B666B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Subtle Caduceus / Neural-Vascular Helix */}
    <path
      d="M32 18C24 22 24 29 32 33C40 37 40 44 32 48"
      stroke="#3B666B"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M32 18C40 22 40 29 32 33C24 37 24 44 32 48"
      stroke="#B58E49"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Botanical / Retinal Canopy Leaves */}
    <path
      d="M32 16C25 10 15 11 12 17C18 20 26 19 32 16Z"
      stroke="#3B666B"
      strokeWidth="1.4"
      fill="#3B666B"
      fillOpacity="0.08"
    />
    <path
      d="M32 16C39 10 49 11 52 17C46 20 38 19 32 16Z"
      stroke="#3B666B"
      strokeWidth="1.4"
      fill="#3B666B"
      fillOpacity="0.08"
    />
    <path
      d="M32 25C23 21 15 23 13 28C19 30 26 28 32 25Z"
      stroke="#3B666B"
      strokeWidth="1.3"
    />
    <path
      d="M32 25C41 21 49 23 51 28C45 30 38 28 32 25Z"
      stroke="#3B666B"
      strokeWidth="1.3"
    />
    {/* Central Ocular Pupil / Focus Node */}
    <circle cx="32" cy="14" r="2.5" fill="#B58E49" />
  </svg>
);

/**
 * INTERACTIVE RETINAL FUNDUS + XAI HEATMAP CANVAS
 * Renders a high-detail anatomical retinal fundus scan (or user-uploaded retinal image)
 * layered with real-time Grad-CAM thermal gradients, SHAP pixel attributions,
 * and clinical pathology bounding annotations.
 */
const RetinalXaiCanvas = ({
  caseData,
  uploadedImageUrl,
  xaiMode, // 'original' | 'gradcam' | 'shap'
  opacity, // 0 to 100
  zoom, // 1 to 2.2
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
                className="underline underline-offset-4 hover:text-[#F3D8A4] transition-colors font-medium ml-1 inline-flex items-center"
              >
                View Research Benchmarks →
              </button>
            </p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss clinical banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/75 hover:text-white p-1"
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
              onClick={() => scrollToSection(workspaceRef)}
              className="hover:text-[#3B666B] transition-colors"
            >
              Screening
            </button>
            <button
              onClick={() => {
                setXaiMode('gradcam');
                scrollToSection(workspaceRef);
              }}
              className="hover:text-[#3B666B] transition-colors"
            >
              XAI Diagnostics
            </button>
            <button
              onClick={() => scrollToSection(benchmarksRef)}
              className="hover:text-[#3B666B] transition-colors"
            >
              Model Benchmarks
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-[#3B666B] transition-colors"
            >
              Architecture
            </button>
          </nav>

          {/* Center Brand Emblem & Stacked Serif Logo (Matching Endura Wellness Reference) */}
          <a
            href="#top"
            className="flex items-center space-x-3 mx-auto md:mx-0 group"
          >
            <OcularisEmblem className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col leading-none">
              <span className="font-editorial text-xl sm:text-2xl tracking-[0.18em] text-[#3B666B] font-semibold uppercase">
                OCULARIS
              </span>
              <span className="font-editorial text-sm sm:text-base tracking-[0.26em] text-[#3B666B]/90 uppercase mt-0.5">
                RETINAL AI
              </span>
            </div>
          </a>

          {/* Right Header Actions (Asymmetric Rounded Pill CTA matching reference) */}
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
              <div className="relative w-full max-w-[390px]">
                {/* Decorative Leaf / Petal Accents on Top-Left Corner (Exact signature motif from reference) */}
                <svg
                  viewBox="0 0 90 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-20 sm:w-20 sm:h-24 absolute -top-6 -left-6 z-20 drop-shadow-sm"
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

                {/* Asymmetric Rounded Frame matching reference image cutout */}
                <div className="relative bg-[#1E2B2A] rounded-tl-[110px] rounded-br-[110px] rounded-tr-3xl rounded-bl-3xl p-6 sm:p-7 shadow-2xl border-4 border-white/80">
                  <div className="flex items-center justify-between text-xs text-white/75 mb-3 px-2">
                    <span className="uppercase tracking-widest text-[10px] text-[#E6C587] font-semibold">
                      Live XAI Preview
                    </span>
                    <span>Grad-CAM Active</span>
                  </div>

                  {/* Mini Interactive Retinal Preview inside the Hero Frame */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#141D1C] p-2">
                    <RetinalXaiCanvas
                      caseData={SAMPLE_CASES[0]}
                      uploadedImageUrl={null}
                      xaiMode="gradcam"
                      opacity={78}
                      zoom={1}
                      showAnnotations={true}
                    />
                  </div>

                  {/* Clinical Summary Pill inside Hero Frame */}
                  <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-white border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#E6C587]">
                          Detected Biomarker
                        </p>
                        <p className="text-sm font-semibold mt-0.5">
                          Moderate Diabetic Retinopathy
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#B58E49] text-white text-xs font-bold">
                        96.4%
                      </span>
                    </div>
                  </div>
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
                At Ocularis Retinal AI, we combine deep learning screening for{' '}
                <strong className="font-semibold text-[#2B3A38]">Diabetic Retinopathy</strong> and{' '}
                <strong className="font-semibold text-[#2B3A38]">Glaucoma</strong> with visual{' '}
                <strong className="font-semibold text-[#2B3A38]">Grad-CAM &amp; SHAP heatmaps</strong>—empowering clinicians to verify every prediction with complete confidence.
              </p>

              {/* CTA Row: Warm Ochre Pill Button (#B58E49) matching 'BOOK AN APPOINTMENT' in reference */}
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

      {/* 4. CORE INTERACTIVE CLINICAL SCREENING & XAI DIAGNOSTIC WORKSPACE */}
      <section
        ref={workspaceRef}
        className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto"
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
      <footer ref={aboutRef} className="bg-[#2B3A38] text-white pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            <div className="md:col-span-5">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-xl">
                  <OcularisEmblem className="w-9 h-9" />
                </div>
                <div>
                  <span className="font-editorial text-2xl tracking-[0.18em] uppercase font-semibold block">
                    Ocularis
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
            <p>© 2026 Ocularis Retinal AI — AI-Based Eye Disease Screening System.</p>
            <p>Built for Transparent Clinical Trust &amp; Comparative Deep Learning Research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}