require 'json'
fin = open "house-votes-84.data", 'r'
fout = open "voting-examples.js", 'w'
fout.write "var voting_examples = [\n"
fin.each do |line|
  parts = line.split(',')
  h = {
    classification: parts[0],
    handicapped_infants: parts[1],
    water_project_cost_sharing: parts[2],
    adoption_of_the_budget_resolution: parts[3],
    physician_fee_freeze: parts[4],
    el_salvador_aid: parts[5],
    religious_groups_in_schools: parts[6],
    anti_satellite_test_ban: parts[7],
    aid_to_nicaraguan_contras: parts[8],
    mx_missile: parts[9],
    immigration: parts[10],
    synfuels_corporation_cutback: parts[11],
    education_spending: parts[12],
    superfund_right_to_sue: parts[13],
    crime: parts[14],
    duty_free_exports: parts[15],
    export_administration_act_south_africa: parts[16]
  }
  fout.write h.to_json + ",\n"
end

fout.write "];\n"
#democrat,n,n,y,n,n,n,y,y,y,y,n,n,n,n,n,y
fout.write "voting_examples = _(voting_examples);\n"
fout.write "var voting_features = ['handicapped_infants','water_project_cost_sharing','adoption_of_the_budget_resolution','physician_fee_freeze','el_salvador_aid','religious_groups_in_schools','anti_satellite_test_ban','aid_to_nicaraguan_contras','mx_missile','immigration','synfuels_corporation_cutback','education_spending','superfund_right_to_sue','crime','duty_free_exports','export_administration_act_south_africa'];\n"

fin.close
fout.close
