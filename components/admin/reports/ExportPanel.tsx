import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, PieChart, BarChart3, Printer } from "lucide-react";

export default function ExportPanel() {
  const exportOptions = [
    {
      icon: <FileText className="h-5 w-5" />,
      label: "PDF Report",
      description: "Laporan lengkap dengan chart",
      format: "PDF",
    },
    {
      icon: <Download className="h-5 w-5" />,
      label: "Excel Data",
      description: "Data mentah untuk analisis",
      format: "XLSX",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      label: "Charts Only",
      description: "Visualisasi grafik saja",
      format: "PNG",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "CSV Export",
      description: "Data tabel sederhana",
      format: "CSV",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exportOptions.map((option, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded">
                {option.icon}
              </div>
              <div>
                <p className="font-medium">{option.label}</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {option.format}
            </Button>
          </div>
        ))}

        {/* Schedule Export */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Jadwalkan Export</h4>
          <div className="space-y-3">
            <select className="w-full p-2 border rounded">
              <option>Setiap bulan</option>
              <option>Setiap quarter</option>
              <option>Setiap tahun</option>
              <option>Setiap minggu</option>
            </select>
            <Button className="w-full">Atur Jadwal</Button>
          </div>
        </div>

        {/* Quick Print */}
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Printer className="h-4 w-4" />
          Quick Print
        </Button>
      </CardContent>
    </Card>
  );
}