<?php

namespace Database\Seeders;

use App\Enums\GeographicalDistributionType;
use App\Models\GeographicalDistribution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeographicalDistributionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $country = GeographicalDistribution::create([
            'type_id' => GeographicalDistributionType::COUNTRY,
            'name' => 'ECUADOR',
        ]);

        $provinces = [
            ['name' => 'AZUAY', 'code' => '01'],
            ['name' => 'BOLIVAR', 'code' => '02'],
            ['name' => 'CAÑAR', 'code' => '03'],
            ['name' => 'CARCHI', 'code' => '04'],
            ['name' => 'COTOPAXI', 'code' => '05'],
            ['name' => 'CHIMBORAZO', 'code' => '06'],
            ['name' => 'EL ORO', 'code' => '07'],
            ['name' => 'ESMERALDAS', 'code' => '08'],
            ['name' => 'GUAYAS', 'code' => '09'],
            ['name' => 'IMBABURA', 'code' => '10'],
            ['name' => 'LOJA', 'code' => '11'],
            ['name' => 'LOS RIOS', 'code' => '12'],
            ['name' => 'MANABI', 'code' => '13'],
            ['name' => 'MORONA SANTIAGO', 'code' => '14'],
            ['name' => 'NAPO', 'code' => '15'],
            ['name' => 'PASTAZA', 'code' => '16'],
            ['name' => 'PICHINCHA', 'code' => '17'],
            ['name' => 'TUNGURAHUA', 'code' => '18'],
            ['name' => 'ZAMORA CHINCHIPE', 'code' => '19'],
            ['name' => 'GALAPAGOS', 'code' => '20'],
            ['name' => 'SUCUMBIOS', 'code' => '21'],
            ['name' => 'ORELLANA', 'code' => '22'],
            ['name' => 'SANTO DOMINGO DE LOS TSACHILAS', 'code' => '23'],
            ['name' => 'SANTA ELENA', 'code' => '24'],
            ['name' => 'ZONAS NO DELIMITADAS', 'code' => '90'],
        ];

        $cantons = [
            ['name' => 'CUENCA', 'code' => '0101', 'province' => '01'],
            ['name' => 'GIRÓN', 'code' => '0102', 'province' => '01'],
            ['name' => 'GUALACEO', 'code' => '0103', 'province' => '01'],
            ['name' => 'NABÓN', 'code' => '0104', 'province' => '01'],
            ['name' => 'PAUTE', 'code' => '0105', 'province' => '01'],
            ['name' => 'PUCARA', 'code' => '0106', 'province' => '01'],
            ['name' => 'SAN FERNANDO', 'code' => '0107', 'province' => '01'],
            ['name' => 'SANTA ISABEL', 'code' => '0108', 'province' => '01'],
            ['name' => 'SIGSIG', 'code' => '0109', 'province' => '01'],
            ['name' => 'OÑA', 'code' => '0110', 'province' => '01'],
            ['name' => 'CHORDELEG', 'code' => '0111', 'province' => '01'],
            ['name' => 'EL PAN', 'code' => '0112', 'province' => '01'],
            ['name' => 'SEVILLA DE ORO', 'code' => '0113', 'province' => '01'],
            ['name' => 'GUACHAPALA', 'code' => '0114', 'province' => '01'],
            ['name' => 'CAMILO PONCE ENRÍQUEZ', 'code' => '0115', 'province' => '01'],

            ['name' => 'GUARANDA', 'code' => '0201', 'province' => '02'],
            ['name' => 'CHILLANES', 'code' => '0202', 'province' => '02'],
            ['name' => 'CHIMBO', 'code' => '0203', 'province' => '02'],
            ['name' => 'ECHEANDÍA', 'code' => '0204', 'province' => '02'],
            ['name' => 'SAN MIGUEL', 'code' => '0205', 'province' => '02'],
            ['name' => 'CALUMA', 'code' => '0206', 'province' => '02'],
            ['name' => 'LAS NAVES', 'code' => '0207', 'province' => '02'],

            ['name' => 'AZOGUES', 'code' => '0301', 'province' => '03'],
            ['name' => 'BIBLIÁN', 'code' => '0302', 'province' => '03'],
            ['name' => 'CAÑAR', 'code' => '0303', 'province' => '03'],
            ['name' => 'LA TRONCAL', 'code' => '0304', 'province' => '03'],
            ['name' => 'EL TAMBO', 'code' => '0305', 'province' => '03'],
            ['name' => 'DÉLEG', 'code' => '0306', 'province' => '03'],
            ['name' => 'SUSCAL', 'code' => '0307', 'province' => '03'],

            ['name' => 'TULCÁN', 'code' => '0401', 'province' => '04'],
            ['name' => 'BOLÍVAR', 'code' => '0402', 'province' => '04'],
            ['name' => 'ESPEJO', 'code' => '0403', 'province' => '04'],
            ['name' => 'MIRA', 'code' => '0404', 'province' => '04'],
            ['name' => 'MONTÚFAR', 'code' => '0405', 'province' => '04'],
            ['name' => 'SAN PEDRO DE HUACA', 'code' => '0406', 'province' => '04'],

            ['name' => 'LATACUNGA', 'code' => '0501', 'province' => '05'],
            ['name' => 'LA MANÁ', 'code' => '0502', 'province' => '05'],
            ['name' => 'PANGUA', 'code' => '0503', 'province' => '05'],
            ['name' => 'PUJILI', 'code' => '0504', 'province' => '05'],
            ['name' => 'SALCEDO', 'code' => '0505', 'province' => '05'],
            ['name' => 'SAQUISILÍ', 'code' => '0506', 'province' => '05'],
            ['name' => 'SIGCHOS', 'code' => '0507', 'province' => '05'],

            ['name' => 'RIOBAMBA', 'code' => '0601', 'province' => '06'],
            ['name' => 'ALAUSI', 'code' => '0602', 'province' => '06'],
            ['name' => 'COLTA', 'code' => '0603', 'province' => '06'],
            ['name' => 'CHAMBO', 'code' => '0604', 'province' => '06'],
            ['name' => 'CHUNCHI', 'code' => '0605', 'province' => '06'],
            ['name' => 'GUAMOTE', 'code' => '0606', 'province' => '06'],
            ['name' => 'GUANO', 'code' => '0607', 'province' => '06'],
            ['name' => 'PALLATANGA', 'code' => '0608', 'province' => '06'],
            ['name' => 'PENIPE', 'code' => '0609', 'province' => '06'],
            ['name' => 'CUMANDÁ', 'code' => '0610', 'province' => '06'],

            ['name' => 'MACHALA', 'code' => '0701', 'province' => '07'],
            ['name' => 'ARENILLAS', 'code' => '0702', 'province' => '07'],
            ['name' => 'ATAHUALPA', 'code' => '0703', 'province' => '07'],
            ['name' => 'BALSAS', 'code' => '0704', 'province' => '07'],
            ['name' => 'CHILLA', 'code' => '0705', 'province' => '07'],
            ['name' => 'EL GUABO', 'code' => '0706', 'province' => '07'],
            ['name' => 'HUAQUILLAS', 'code' => '0707', 'province' => '07'],
            ['name' => 'MARCABELÍ', 'code' => '0708', 'province' => '07'],
            ['name' => 'PASAJE', 'code' => '0709', 'province' => '07'],
            ['name' => 'PIÑAS', 'code' => '0710', 'province' => '07'],
            ['name' => 'PORTOVELO', 'code' => '0711', 'province' => '07'],
            ['name' => 'SANTA ROSA', 'code' => '0712', 'province' => '07'],
            ['name' => 'ZARUMA', 'code' => '0713', 'province' => '07'],
            ['name' => 'LAS LAJAS', 'code' => '0714', 'province' => '07'],

            ['name' => 'ESMERALDAS', 'code' => '0801', 'province' => '08'],
            ['name' => 'ELOY ALFARO', 'code' => '0802', 'province' => '08'],
            ['name' => 'MUISNE', 'code' => '0803', 'province' => '08'],
            ['name' => 'QUININDÉ', 'code' => '0804', 'province' => '08'],
            ['name' => 'SAN LORENZO', 'code' => '0805', 'province' => '08'],
            ['name' => 'ATACAMES', 'code' => '0806', 'province' => '08'],
            ['name' => 'RIOVERDE', 'code' => '0807', 'province' => '08'],
            ['name' => 'LA CONCORDIA', 'code' => '0808', 'province' => '08'],

            ['name' => 'GUAYAQUIL', 'code' => '0901', 'province' => '09'],
            ['name' => 'ALFREDO BAQUERIZO MORENO (JUJÁN)', 'code' => '0902', 'province' => '09'],
            ['name' => 'BALAO', 'code' => '0903', 'province' => '09'],
            ['name' => 'BALZAR', 'code' => '0904', 'province' => '09'],
            ['name' => 'COLIMES', 'code' => '0905', 'province' => '09'],
            ['name' => 'DAULE', 'code' => '0906', 'province' => '09'],
            ['name' => 'DURÁN', 'code' => '0907', 'province' => '09'],
            ['name' => 'EL EMPALME', 'code' => '0908', 'province' => '09'],
            ['name' => 'EL TRIUNFO', 'code' => '0909', 'province' => '09'],
            ['name' => 'MILAGRO', 'code' => '0910', 'province' => '09'],
            ['name' => 'NARANJAL', 'code' => '0911', 'province' => '09'],
            ['name' => 'NARANJITO', 'code' => '0912', 'province' => '09'],
            ['name' => 'PALESTINA', 'code' => '0913', 'province' => '09'],
            ['name' => 'PEDRO CARBO', 'code' => '0914', 'province' => '09'],
            ['name' => 'SAMBORONDÓN', 'code' => '0916', 'province' => '09'],
            ['name' => 'SANTA LUCÍA', 'code' => '0918', 'province' => '09'],
            ['name' => 'SALITRE (URBINA JADO)', 'code' => '0919', 'province' => '09'],
            ['name' => 'SAN JACINTO DE YAGUACHI', 'code' => '0920', 'province' => '09'],
            ['name' => 'PLAYAS', 'code' => '0921', 'province' => '09'],
            ['name' => 'SIMÓN BOLÍVAR', 'code' => '0922', 'province' => '09'],
            ['name' => 'CORONEL MARCELINO MARIDUEÑA', 'code' => '0923', 'province' => '09'],
            ['name' => 'LOMAS DE SARGENTILLO', 'code' => '0924', 'province' => '09'],
            ['name' => 'NOBOL', 'code' => '0925', 'province' => '09'],
            ['name' => 'GENERAL ANTONIO ELIZALDE', 'code' => '0927', 'province' => '09'],
            ['name' => 'ISIDRO AYORA', 'code' => '0928', 'province' => '09'],

            ['name' => 'IBARRA', 'code' => '1001', 'province' => '10'],
            ['name' => 'ANTONIO ANTE', 'code' => '1002', 'province' => '10'],
            ['name' => 'COTACACHI', 'code' => '1003', 'province' => '10'],
            ['name' => 'OTAVALO', 'code' => '1004', 'province' => '10'],
            ['name' => 'PIMAMPIRO', 'code' => '1005', 'province' => '10'],
            ['name' => 'SAN MIGUEL DE URCUQUÍ', 'code' => '1006', 'province' => '10'],

            ['name' => 'LOJA', 'code' => '1101', 'province' => '11'],
            ['name' => 'CALVAS', 'code' => '1102', 'province' => '11'],
            ['name' => 'CATAMAYO', 'code' => '1103', 'province' => '11'],
            ['name' => 'CELICA', 'code' => '1104', 'province' => '11'],
            ['name' => 'CHAGUARPAMBA', 'code' => '1105', 'province' => '11'],
            ['name' => 'ESPÍNDOLA', 'code' => '1106', 'province' => '11'],
            ['name' => 'GONZANAMÁ', 'code' => '1107', 'province' => '11'],
            ['name' => 'MACARÁ', 'code' => '1108', 'province' => '11'],
            ['name' => 'PALTAS', 'code' => '1109', 'province' => '11'],
            ['name' => 'PUYANGO', 'code' => '1110', 'province' => '11'],
            ['name' => 'SARAGURO', 'code' => '1111', 'province' => '11'],
            ['name' => 'SOZORANGA', 'code' => '1112', 'province' => '11'],
            ['name' => 'ZAPOTILLO', 'code' => '1113', 'province' => '11'],
            ['name' => 'PINDAL', 'code' => '1114', 'province' => '11'],
            ['name' => 'QUILANGA', 'code' => '1115', 'province' => '11'],
            ['name' => 'OLMEDO', 'code' => '1116', 'province' => '11'],

            ['name' => 'BABAHOYO', 'code' => '1201', 'province' => '12'],
            ['name' => 'BABA', 'code' => '1202', 'province' => '12'],
            ['name' => 'MONTALVO', 'code' => '1203', 'province' => '12'],
            ['name' => 'PUEBLOVIEJO', 'code' => '1204', 'province' => '12'],
            ['name' => 'QUEVEDO', 'code' => '1205', 'province' => '12'],
            ['name' => 'URDANETA', 'code' => '1206', 'province' => '12'],
            ['name' => 'VENTANAS', 'code' => '1207', 'province' => '12'],
            ['name' => 'VÍNCES', 'code' => '1208', 'province' => '12'],
            ['name' => 'PALENQUE', 'code' => '1209', 'province' => '12'],
            ['name' => 'BUENA FÉ', 'code' => '1210', 'province' => '12'],
            ['name' => 'VALENCIA', 'code' => '1211', 'province' => '12'],
            ['name' => 'MOCACHE', 'code' => '1212', 'province' => '12'],
            ['name' => 'QUINSALOMA', 'code' => '1213', 'province' => '12'],

            ['name' => 'PORTOVIEJO', 'code' => '1301', 'province' => '13'],
            ['name' => 'BOLÍVAR', 'code' => '1302', 'province' => '13'],
            ['name' => 'CHONE', 'code' => '1303', 'province' => '13'],
            ['name' => 'EL CARMEN', 'code' => '1304', 'province' => '13'],
            ['name' => 'FLAVIO ALFARO', 'code' => '1305', 'province' => '13'],
            ['name' => 'JIPIJAPA', 'code' => '1306', 'province' => '13'],
            ['name' => 'JUNÍN', 'code' => '1307', 'province' => '13'],
            ['name' => 'MANTA', 'code' => '1308', 'province' => '13'],
            ['name' => 'MONTECRISTI', 'code' => '1309', 'province' => '13'],
            ['name' => 'PAJÁN', 'code' => '1310', 'province' => '13'],
            ['name' => 'PICHINCHA', 'code' => '1311', 'province' => '13'],
            ['name' => 'ROCAFUERTE', 'code' => '1312', 'province' => '13'],
            ['name' => 'SANTA ANA', 'code' => '1313', 'province' => '13'],
            ['name' => 'SUCRE', 'code' => '1314', 'province' => '13'],
            ['name' => 'TOSAGUA', 'code' => '1315', 'province' => '13'],
            ['name' => '24 DE MAYO', 'code' => '1316', 'province' => '13'],
            ['name' => 'PEDERNALES', 'code' => '1317', 'province' => '13'],
            ['name' => 'OLMEDO', 'code' => '1318', 'province' => '13'],
            ['name' => 'PUERTO LÓPEZ', 'code' => '1319', 'province' => '13'],
            ['name' => 'JAMA', 'code' => '1320', 'province' => '13'],
            ['name' => 'JARAMIJÓ', 'code' => '1321', 'province' => '13'],
            ['name' => 'SAN VICENTE', 'code' => '1322', 'province' => '13'],

            ['name' => 'MORONA', 'code' => '1401', 'province' => '14'],
            ['name' => 'GUALAQUIZA', 'code' => '1402', 'province' => '14'],
            ['name' => 'LIMÓN INDANZA', 'code' => '1403', 'province' => '14'],
            ['name' => 'PALORA', 'code' => '1404', 'province' => '14'],
            ['name' => 'SANTIAGO', 'code' => '1405', 'province' => '14'],
            ['name' => 'SUCÚA', 'code' => '1406', 'province' => '14'],
            ['name' => 'HUAMBOYA', 'code' => '1407', 'province' => '14'],
            ['name' => 'SAN JUAN BOSCO', 'code' => '1408', 'province' => '14'],
            ['name' => 'TAISHA', 'code' => '1409', 'province' => '14'],
            ['name' => 'LOGROÑO', 'code' => '1410', 'province' => '14'],
            ['name' => 'PABLO SEXTO', 'code' => '1411', 'province' => '14'],
            ['name' => 'TIWINTZA', 'code' => '1412', 'province' => '14'],

            ['name' => 'TENA', 'code' => '1501', 'province' => '15'],
            ['name' => 'ARCHIDONA', 'code' => '1503', 'province' => '15'],
            ['name' => 'EL CHACO', 'code' => '1504', 'province' => '15'],
            ['name' => 'QUIJOS', 'code' => '1507', 'province' => '15'],
            ['name' => 'CARLOS JULIO AROSEMENA TOLA', 'code' => '1509', 'province' => '15'],

            ['name' => 'PASTAZA', 'code' => '1601', 'province' => '16'],
            ['name' => 'MERA', 'code' => '1602', 'province' => '16'],
            ['name' => 'SANTA CLARA', 'code' => '1603', 'province' => '16'],
            ['name' => 'ARAJUNO', 'code' => '1604', 'province' => '16'],

            ['name' => 'QUITO', 'code' => '1701', 'province' => '17'],
            ['name' => 'CAYAMBE', 'code' => '1702', 'province' => '17'],
            ['name' => 'MEJIA', 'code' => '1703', 'province' => '17'],
            ['name' => 'PEDRO MONCAYO', 'code' => '1704', 'province' => '17'],
            ['name' => 'RUMIÑAHUI', 'code' => '1705', 'province' => '17'],
            ['name' => 'SAN MIGUEL DE LOS BANCOS', 'code' => '1707', 'province' => '17'],
            ['name' => 'PEDRO VICENTE MALDONADO', 'code' => '1708', 'province' => '17'],
            ['name' => 'PUERTO QUITO', 'code' => '1709', 'province' => '17'],

            ['name' => 'AMBATO', 'code' => '1801', 'province' => '18'],
            ['name' => 'BAÑOS DE AGUA SANTA', 'code' => '1802', 'province' => '18'],
            ['name' => 'CEVALLOS', 'code' => '1803', 'province' => '18'],
            ['name' => 'MOCHA', 'code' => '1804', 'province' => '18'],
            ['name' => 'PATATE', 'code' => '1805', 'province' => '18'],
            ['name' => 'QUERO', 'code' => '1806', 'province' => '18'],
            ['name' => 'SAN PEDRO DE PELILEO', 'code' => '1807', 'province' => '18'],
            ['name' => 'SANTIAGO DE PÍLLARO', 'code' => '1808', 'province' => '18'],
            ['name' => 'TISALEO', 'code' => '1809', 'province' => '18'],

            ['name' => 'ZAMORA', 'code' => '1901', 'province' => '19'],
            ['name' => 'CHINCHIPE', 'code' => '1902', 'province' => '19'],
            ['name' => 'NANGARITZA', 'code' => '1903', 'province' => '19'],
            ['name' => 'YACUAMBI', 'code' => '1904', 'province' => '19'],
            ['name' => 'YANTZAZA (YANZATZA)', 'code' => '1905', 'province' => '19'],
            ['name' => 'EL PANGUI', 'code' => '1906', 'province' => '19'],
            ['name' => 'CENTINELA DEL CÓNDOR', 'code' => '1907', 'province' => '19'],
            ['name' => 'PALANDA', 'code' => '1908', 'province' => '19'],
            ['name' => 'PAQUISHA', 'code' => '1909', 'province' => '19'],

            ['name' => 'SAN CRISTÓBAL', 'code' => '2001', 'province' => '20'],
            ['name' => 'ISABELA', 'code' => '2002', 'province' => '20'],
            ['name' => 'SANTA CRUZ', 'code' => '2003', 'province' => '20'],

            ['name' => 'LAGO AGRIO', 'code' => '2101', 'province' => '21'],
            ['name' => 'GONZALO PIZARRO', 'code' => '2102', 'province' => '21'],
            ['name' => 'PUTUMAYO', 'code' => '2103', 'province' => '21'],
            ['name' => 'SHUSHUFINDI', 'code' => '2104', 'province' => '21'],
            ['name' => 'SUCUMBÍOS', 'code' => '2105', 'province' => '21'],
            ['name' => 'CASCALES', 'code' => '2106', 'province' => '21'],
            ['name' => 'CUYABENO', 'code' => '2107', 'province' => '21'],

            ['name' => 'ORELLANA', 'code' => '2201', 'province' => '22'],
            ['name' => 'AGUARICO', 'code' => '2202', 'province' => '22'],
            ['name' => 'LA JOYA DE LOS SACHAS', 'code' => '2203', 'province' => '22'],
            ['name' => 'LORETO', 'code' => '2204', 'province' => '22'],

            ['name' => 'SANTO DOMINGO', 'code' => '2301', 'province' => '23'],

            ['name' => 'SANTA ELENA', 'code' => '2401', 'province' => '24'],
            ['name' => 'LA LIBERTAD', 'code' => '2402', 'province' => '24'],
            ['name' => 'SALINAS', 'code' => '2403', 'province' => '24'],

            ['name' => 'LAS GOLONDRINAS', 'code' => '9001', 'province' => '90'],
            ['name' => 'MANGA DEL CURA', 'code' => '9002', 'province' => '90'],
            ['name' => 'EL PIEDRERO', 'code' => '9003', 'province' => '90'],
        ];

        foreach ($provinces as $province) {
            $province = $country->sons()->create([
                'type_id' => GeographicalDistributionType::PROVINCE,
                'name' => $province['name'],
                'code' => $province['code'],
            ]);

            collect($cantons)
                ->filter(fn ($canton) => $canton['province'] == $province['code'])
                ->each(function ($canton) use($province) {
                    $province->sons()->create([
                        'type_id' => GeographicalDistributionType::CANTON,
                        'name' => $canton['name'],
                        'code' => $canton['code'],
                    ]);
                });
        }
    }
}
